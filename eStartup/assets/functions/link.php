<?php

// Include PHPMailer
require '../../../vendor/autoload.php';


// Function to generate admin approval link
function generateApprovalLink($email, $hashedPassword)
{
    $token = base64_encode(json_encode(["Email" => $email, "Password" => $hashedPassword]));
    return "http://13.60.229.207/Job-Role-Relevance/eStartup/assets/admin/approval.php?action=approve&token=$token";
}

// Function to generate admin decline link
function generateDeclineLink($email)
{
    $token = base64_encode(json_encode(["Email" => $email]));
    return "http://13.60.229.207/Job-Role-Relevance/eStartup/assets/admin/approval.php?action=decline&token=$token";
}

# a commit message
# another commit message
# another commit message
# another commit message
# another commit message