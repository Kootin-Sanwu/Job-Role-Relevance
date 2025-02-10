<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

// Include the database connection file
include_once "../settings/connection.php";

// Include the OTP generation function
include_once "../functions/send_OTP.php";

// Include the approval link generation function
include_once "../functions/link.php";

// Include the approval notification function
include_once "../functions/approval.php";

// Include the approval notification function
include_once "../functions/notify.php";


if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['Email'], $_POST['Password'], $_POST['Action'])) {

    if ($_POST['Action'] === 'approve') {

        $email = $_POST['Email'];
        $hashedPassword = $_POST['Password'];

        try {

            $stmt = $pdo->prepare("INSERT INTO Organizations (Email, Password) VALUES (:Email, :Password)");  // Insert user into the database
            $stmt->bindParam(':Email', $email);
            $stmt->bindParam(':Password', $hashedPassword);

            if ($stmt->execute()) {

                if (sendApprovalEmail($email)) {

                    header("Location: ../../index.php?msg=User approved and registered successfully. Notification sent.");  // Send email notification
  
                } else {

                    header("Location: ../../index.php?msg=User approved and registered successfully. Email notification failed.");
                }
                exit();
            } else {

                // header("Location: ../../index.php?msg=Failed to register the user.");
                header("Location: ../admin/approval.php?msg=User approved and registered successfully. Notification sent.");  // Send email notification
                exit();
            }
        } catch (PDOException $e) {

            header("Location: ../views/admin.php?msg=Database error: " . $e->getMessage());
            exit();
        }
    } else if ($_POST['Action'] === 'decline') {

        $email = $data['Email'];
        header("Location: ../../index.php?msg=User registration declined for email: $email");
        exit();
    }
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $errors = [];

    // Retrieve form inputs
    $email = trim($_POST['Email']);
    $password = $_POST['Password'];
    $confirmPassword = $_POST['Confirm_Password'];

    $_SESSION['Email'] = $email;
    $_SESSION['Password'] = $password;
    $_SESSION['Confirm_Password'] = $confirmPassword;

    // Validate required fields
    if (empty($email) || empty($password) || empty($confirmPassword)) {

        header("Location: ../views/login.php?msg=" . urlencode("All fields must be filled"));
        exit();
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        header("Location: ../views/login.php?msg=Please enter a valid email address.");
        exit();
    }

    // Check if passwords match
    if ($password !== $confirmPassword) {

        header("Location: ../views/login.php?msg=Passwords do not match.");
        exit();
    }

    // Validate password strength
    $passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
    if (!preg_match($passwordRegex, $password)) {

        header("Location: ../views/login.php?msg=Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        exit();
    }

    try {
        // Check for existing email in the database
        $stmt = $pdo->prepare("SELECT Email FROM Organizations WHERE Email = :Email");
        $stmt->bindParam(':Email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {

            header("Location: ../views/login.php?msg=Email already exists. Please use a different email.");
            exit();
        }

        // Do not move this session. The placement is critical to the execution of this code
        $_SESSION['registering'] = "registering";

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $_SESSION['hashedPassword'] = $hashedPassword;

        // Generate OTP
        $OTP = rand(100000, 999999);
        $_SESSION['OTP'] = $OTP;
        $_SESSION['OTP_timestamp'] = time();

        // Send OTP email
        sendOTP($email, $OTP);

        header("Location: ../views/verify_otp.php");
        exit();
    } catch (PDOException $e) {

        header("Location: ../views/login.php?msg=Database error: " . $e->getMessage());
        exit();
    }
} else if (isset($_GET['msg'])) {

    $message = $_GET['msg'];

    if ($message === "registering") {

        $email = $_SESSION['Email'];
        $hashedPassword = $_SESSION['hashedPassword'];

        try {
            // Send email to admin for approval
            $adminEmail = "kootin.nuamah@ashesi.edu.gh";
            $adminApprovalLink = generateApprovalLink($email, $hashedPassword);
            $adminDeclineLink = generateDeclineLink($email);
            notifyAdmin($adminEmail, $email, $adminApprovalLink, $adminDeclineLink);

            // Redirect with success message
            header("Location: ../../index.php?msg=" . urlencode("Your registration request has been sent for approval."));
            exit();
        } catch (PDOException $e) {
            // Redirect with database error message
            header("Location: ../views/login.php?msg=" . urlencode("Database error: " . $e->getMessage()));
            exit();
        }
    } else {
        echo "The message is: " . htmlspecialchars($message);
    }
} else {
    echo "No message found. No requirement met.";
}
