<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $tourId = $_GET['tour_id'] ?? null;
        if (!$tourId) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Tour ID is required']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT * FROM tour_translations WHERE tour_id = ?");
        $stmt->execute([$tourId]);
        $translations = $stmt->fetchAll();
        
        echo json_encode(['status' => 'success', 'data' => $translations]);
    } 
    elseif ($method === 'POST') {
        // Upsert mantığı kullanacağız (Varsa güncelle, yoksa ekle)
        $input = json_decode(file_get_contents('php://input'), true);
        
        $tourId = $input['tour_id'] ?? null;
        $langCode = $input['lang_code'] ?? null;
        $title = $input['title'] ?? '';
        $desc = $input['description'] ?? '';
        $conditions = $input['special_conditions'] ?? '';

        if (!$tourId || !$langCode || !$title) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
            exit;
        }

        // MySQL ON DUPLICATE KEY UPDATE mantığı
        $sql = "INSERT INTO tour_translations (tour_id, lang_code, title, description, special_conditions) 
                VALUES (?, ?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), special_conditions=VALUES(special_conditions)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$tourId, $langCode, $title, $desc, $conditions]);

        echo json_encode(['status' => 'success', 'message' => 'Tur çevirisi kaydedildi']);
    } else {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
}
?>
