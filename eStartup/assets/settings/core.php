<?php
session_start(); // Start a session to manage user sessions

// Function to redirect users
function redirect($url)
{
    header("Location: $url");
    exit;
}

// Function to check user role
function checkRole($requiredRole)
{
    if (!isset($_SESSION['role']) || $_SESSION['role'] !== $requiredRole) {
        die("Unauthorized access!"); // Stop execution if the role doesn't match
    }
}

// Function to sanitize user inputs
function sanitizeInput($input)
{
    return htmlspecialchars(strip_tags(trim($input)));
}

// Function to hash passwords
function hashPassword($password)
{
    return password_hash($password, PASSWORD_BCRYPT);
}

// Function to verify passwords
function verifyPassword($password, $hashedPassword)
{
    return password_verify($password, $hashedPassword);
}
