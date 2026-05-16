<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        // Turları listele (Admin görünümü)
        $stmt = $pdo->query("SELECT * FROM tours ORDER BY created_at DESC");
        $tours = $stmt->fetchAll();
        
        echo json_encode(['status' => 'success', 'data' => $tours]);
    } 
    elseif ($method === 'POST') {
        // Yeni tur ekle
        $input = json_decode(file_get_contents('php://input'), true);
        
        $price = $input['price'] ?? 0;
        $quota = $input['quota'] ?? 0;
        $start_date = $input['start_date'] ?? date('Y-m-d');
        $end_date = $input['end_date'] ?? date('Y-m-d');
        $is_active = $input['is_active'] ?? 1;

        $stmt = $pdo->prepare("INSERT INTO tours (price, quota, start_date, end_date, is_active) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$price, $quota, $start_date, $end_date, $is_active]);
        $tourId = $pdo->lastInsertId();

        // Varsayılan dili ekleyelim (örneğin TR) formda gönderilmişse
        if (!empty($input['title'])) {
            $langCode = $input['lang_code'] ?? 'TR';
            $title = $input['title'];
            $desc = $input['description'] ?? '';
            $conditions = $input['special_conditions'] ?? '';
            
            $stmtTrans = $pdo->prepare("INSERT INTO tour_translations (tour_id, lang_code, title, description, special_conditions) VALUES (?, ?, ?, ?, ?)");
            $stmtTrans->execute([$tourId, $langCode, $title, $desc, $conditions]);
        }

        echo json_encode(['status' => 'success', 'message' => 'Tur başarıyla eklendi', 'tour_id' => $tourId]);
    }
    elseif ($method === 'PUT') {
        // Tur güncelle
        $input = json_decode(file_get_contents('php://input'), true);
        $tourId = $input['id'] ?? null;
        
        if (!$tourId) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Tour ID is required']);
            exit;
        }

        $price = $input['price'] ?? 0;
        $quota = $input['quota'] ?? 0;
        $start_date = $input['start_date'] ?? date('Y-m-d');
        $end_date = $input['end_date'] ?? date('Y-m-d');
        $is_active = $input['is_active'] ?? 1;

        $stmt = $pdo->prepare("UPDATE tours SET price=?, quota=?, start_date=?, end_date=?, is_active=? WHERE id=?");
        $stmt->execute([$price, $quota, $start_date, $end_date, $is_active, $tourId]);

        echo json_encode(['status' => 'success', 'message' => 'Tur güncellendi']);
    }
    elseif ($method === 'DELETE') {
        // Tur sil (CASCADE sayesinde tüm çeviriler ve fotoğraflar da silinecek)
        $tourId = $_GET['id'] ?? null;
        if (!$tourId) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Tour ID is required']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM tours WHERE id=?");
        $stmt->execute([$tourId]);

        echo json_encode(['status' => 'success', 'message' => 'Tur silindi']);
    } else {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
}
?>
