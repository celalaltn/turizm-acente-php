<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM languages ORDER BY id ASC");
        $languages = $stmt->fetchAll();
        
        echo json_encode(['status' => 'success', 'data' => $languages]);
    } 
    elseif ($method === 'POST') {
        // Yeni dil ekle
        $input = json_decode(file_get_contents('php://input'), true);
        
        $code = strtoupper(trim($input['code'] ?? ''));
        $name = trim($input['name'] ?? '');
        $isRtl = isset($input['is_rtl']) ? (int)$input['is_rtl'] : ($code === 'AR' ? 1 : 0);

        if (!$code || !$name) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Code and Name are required']);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO languages (code, name, is_rtl, is_active) VALUES (?, ?, ?, 1)");
        $stmt->execute([$code, $name, $isRtl]);

        echo json_encode(['status' => 'success', 'message' => 'Yeni dil başarıyla eklendi']);
    }
    elseif ($method === 'PUT') {
        // Dil durumunu (aktif/pasif) güncelle
        $input = json_decode(file_get_contents('php://input'), true);
        $code = $input['code'] ?? null;
        $isActive = isset($input['is_active']) ? (int)$input['is_active'] : null;

        if (!$code || $isActive === null) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Code and is_active are required']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE languages SET is_active = ? WHERE code = ?");
        $stmt->execute([$isActive, $code]);

        echo json_encode(['status' => 'success', 'message' => 'Dil durumu güncellendi']);
    } else {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    // 23000 = Duplicate key
    if ($e->getCode() == 23000) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Bu dil kodu zaten ekli']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
    }
}
?>
