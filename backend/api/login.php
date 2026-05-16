<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// User credentials as requested
$admin_email = 'admin@asrholiday.com';
$admin_pass = 'Antalya07..';

if ($email === $admin_email && $password === $admin_pass) {
    echo json_encode([
        'status' => 'success',
        'token' => base64_encode($email . ':' . time()), // Simple token for demonstration
        'message' => 'Giriş başarılı'
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'E-posta veya şifre hatalı'
    ]);
}
