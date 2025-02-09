<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

// Include the database connection file
include_once "../settings/connection.php";

// Include the OTP generation function
include_once "../functions/send_OTP.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $_SESSION['signingIn'] = "signingIn";
    $email = trim($_POST['Email']);
    $errors = [];

    if (empty($_POST['Email'])) {

        $errors[] = "Email is required.";
    } else {

        $email = filter_var($email, FILTER_SANITIZE_EMAIL);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

            $errors[] = "Invalid email format.";
        }
    }

    if (empty($_POST['Password'])) {

        $errors[] = "Password is required.";
    }

    if (empty($errors)) {

        $password = $_POST['Password'];

        try {

            $stmt = $pdo->prepare("SELECT OrganizationID, Password FROM Organizations WHERE Email = :Email");
            $stmt->bindParam(":Email", $email, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() === 1) {
                $row = $stmt->fetch();

                if (password_verify($password, $row['Password'])) {

                    $_SESSION['OrganizationID'] = $row['OrganizationID'];
                    $_SESSION['Email'] = $email;

                    // Generate OTP
                    $OTP = rand(100000, 999999);
                    $_SESSION['OTP'] = $OTP;
                    $_SESSION['OTP_timestamp'] = time();

                    // Send OTP email
                    sendOTP($email, $OTP);

                    // Redirect to OTP verification
                    $message = "Successfully signed in. Kindly check your email for the OTP.";
                    header("Location: ../views/verify_otp.php?msg=" . urlencode($message));
                    exit();
                } else {

                    header("Location: ../views/login.php?msg=" . urlencode("Invalid email or password."));
                    exit();
                }
            } else {

                header("Location: ../views/login.php?msg=" . urlencode("Invalid email or password."));
                exit();
            }
        } catch (PDOException $e) {

            header("Location: ../views/login.php?msg=Database error: " . $e->getMessage());
            exit();
        }
    } else {

        header("Location: ../views/login.php?msg=" . urlencode(implode(" ", $errors)));
        exit();
    }
} else if (isset($_GET['msg'])) {

    $message = $_GET['msg'];

    if ($message === "signingIn") {

        header("Location: ../dist/metrics.html");
        // header("Location: ../dist/analyses.html");
    } else {

        echo "The message is: " . htmlspecialchars($message);
    }
} else {

    header("Location: ../views/login.php?msg=Invalid request method.");
    exit();
};
