<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../../db.php';

$lang = $_GET['lang'] ?? 'TR';

try {
    $stmt = $pdo->prepare("SELECT translation_key, translation_value FROM translations WHERE lang_code = ?");
    $stmt->execute([$lang]);
    $data = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    
    echo json_encode(['status' => 'success', 'data' => $data]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
