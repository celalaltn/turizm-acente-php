<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../../db.php';

try {
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings WHERE setting_key LIKE 'contact_%'");
    $data = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    
    echo json_encode(['status' => 'success', 'data' => $data]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
