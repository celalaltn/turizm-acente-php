<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

// Get JSON post data
$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? null;
$email = $input['email'] ?? null;
$phone = $input['phone'] ?? null;
$note = $input['note'] ?? null;

if (!$name || !$email) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Name and Email are required fields.']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, note) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $note]);
    
    echo json_encode(['status' => 'success', 'message' => 'Message successfully saved.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
