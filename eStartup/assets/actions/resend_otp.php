<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

// Include the OTP generation function
include_once "../functions/send_OTP.php";


if (isset($_SESSION['Email'])) {

    $email = $_SESSION['Email'];
    $errors = [];

    // Generate OTP
    $OTP = rand(100000, 999999);

    $_SESSION['OTP'] = $OTP;
    $_SESSION['Email'] = $email;
    $_SESSION['OTP_timestamp'] = time();

    // Send OTP email
    sendOTP($email, $OTP);

    // Redirect to OTP verification page
    header("Location: ../views/verify_otp.php?msg=" . urlencode("OTP has been resent."));
    exit();
}
