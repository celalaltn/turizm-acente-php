<?php
// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
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
?>
