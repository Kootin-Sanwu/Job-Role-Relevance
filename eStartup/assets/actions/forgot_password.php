<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

// Include the database connection file
include_once "../settings/connection.php";

// Include the OTP generation function
include_once "../functions/send_OTP.php";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['Email'])) {

    $email = filter_var($_POST['Email'], FILTER_SANITIZE_EMAIL);
    $_SESSION['Email'] = $email;

    if (isset($_POST['Forgot_Password'])) {
        $forgot_password = $_POST['Forgot_Password'];
        $_SESSION['Forgot_Password'] = $forgot_password;
    } else if (
        isset($_POST['New_Password']) && isset($_POST['Confirm_New_Password']) &&
        !empty($_POST['New_Password']) && !empty($_POST['Confirm_New_Password'])
    ) {
        $new_password = trim($_POST['New_Password']);
        $confirm_new_password = trim($_POST['Confirm_New_Password']);

        $passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
        if (!preg_match($passwordRegex, $new_password)) {
            header("Location: ../views/reset_password.php?msg=Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
            exit();
        }

        if ($new_password !== $confirm_new_password) {
            header("Location: ../views/reset_password.php?msg=Passwords do not match.");
            exit();
        }

        $hashedPassword = password_hash($confirm_new_password, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("UPDATE Organizations SET Password = ? WHERE Email = ?");
        $stmt->execute([$hashedPassword, $email]);

        if ($stmt->rowCount() > 0) {
            header("Location: ../views/login.php?msg=Password updated successfully.");
            exit();
        } else {
            header("Location: ../views/reset_password.php?msg=Error updating password.");
            exit();
        }
    }

    $errors = [];

    try {
        if ($_SESSION['Forgot_Password'] === "Forgot_Password") {

            $stmt = $pdo->prepare("SELECT Email FROM Organizations WHERE Email = ?");
            $stmt->execute([$email]);

            // Email exists, proceed to generate OTP
            if ($stmt->rowCount() > 0) {

                // Generate OTP
                $OTP = rand(100000, 999999);

                // Store OTP and email in session for verification later
                $_SESSION['OTP'] = $OTP;
                $_SESSION['Email'] = $email;
                $_SESSION['OTP_timestamp'] = time();

                // Send OTP email
                sendOTP($email, $OTP);
                header("Location: ../views/verify_otp.php?msg=" . urlencode($forgot_password));
                exit();
            } else {

                header("Location: ../views/forgot_password.php?msg=Email not found.");
                exit();
            }
        } else {

            echo "No password reset request received.";
        }
    } catch (PDOException $e) {
        die("Database error: " . $e->getMessage());
    }
} else if (isset($_GET['msg']) && $_GET['msg'] === 'Reset Password') {

    header("Location: ../views/reset_password.php");
    exit();
} else {

    echo "No request method received. No Reset Password message received";
};
