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
        $langCode = $_GET['lang'] ?? null;
        
        if ($langCode) {
            $stmt = $pdo->prepare("SELECT translation_key, translation_value FROM translations WHERE lang_code = ?");
            $stmt->execute([$langCode]);
            $translations = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
            echo json_encode(['status' => 'success', 'data' => $translations]);
        } else {
            // Tüm dillerin çevirilerini getir
            $stmt = $pdo->query("SELECT lang_code, translation_key, translation_value FROM translations");
            $all = $stmt->fetchAll();
            $grouped = [];
            foreach ($all as $row) {
                $grouped[$row['lang_code']][$row['translation_key']] = $row['translation_value'];
            }
            echo json_encode(['status' => 'success', 'data' => $grouped]);
        }
    } 
    elseif ($method === 'POST') {
        // Çevirileri kaydet (Upsert)
        $input = json_decode(file_get_contents('php://input'), true);
        
        $langCode = $input['lang_code'] ?? null;
        $translations = $input['translations'] ?? []; // format: ["nav.home" => "Anasayfa", ...]

        if (!$langCode || !is_array($translations)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid payload']);
            exit;
        }

        $pdo->beginTransaction();
        
        $sql = "INSERT INTO translations (lang_code, translation_key, translation_value) 
                VALUES (?, ?, ?) 
                ON DUPLICATE KEY UPDATE translation_value = VALUES(translation_value)";
        $stmt = $pdo->prepare($sql);

        foreach ($translations as $key => $value) {
            if (trim($value) !== '') {
                $stmt->execute([$langCode, $key, $value]);
            }
        }

        $pdo->commit();
        echo json_encode(['status' => 'success', 'message' => 'Çeviriler başarıyla güncellendi']);
    } else {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
}
?>
