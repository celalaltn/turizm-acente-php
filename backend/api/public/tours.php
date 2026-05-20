<?php
// CORS Headers
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../db.php';

$lang = $_GET['lang'] ?? 'TR';
$startDate = $_GET['start'] ?? $_GET['start_date'] ?? null;
$endDate = $_GET['end'] ?? $_GET['end_date'] ?? null;
$tourId = $_GET['id'] ?? null;

try {
    // If id is provided, fetch single tour detail
    if ($tourId) {
        $sql = "SELECT t.id, t.price, t.quota, t.start_date, t.end_date, 
                       tt.title, tt.description, tt.special_conditions
                FROM tours t
                JOIN tour_translations tt ON t.id = tt.tour_id
                WHERE t.id = ? AND tt.lang_code = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$tourId, $lang]);
        $tour = $stmt->fetch();

        if ($tour) {
            $stmtImg = $pdo->prepare("SELECT image_path FROM tour_images WHERE tour_id = ? ORDER BY sort_order ASC");
            $stmtImg->execute([$tour['id']]);
            $tour['images'] = $stmtImg->fetchAll(PDO::FETCH_COLUMN);
            
            echo json_encode(['status' => 'success', 'data' => $tour]);
        } else {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Tour not found']);
        }
        exit;
    }
    $sql = "SELECT t.id, t.price, t.quota, t.start_date, t.end_date, 
                   tt.title, tt.description, tt.special_conditions
            FROM tours t
            JOIN tour_translations tt ON t.id = tt.tour_id
            WHERE t.is_active = 1 AND tt.lang_code = ?";
    
    $params = [$lang];

    if ($startDate) {
        $sql .= " AND t.start_date >= ?";
        $params[] = $startDate;
    }

    if ($endDate) {
        $sql .= " AND t.end_date <= ?";
        $params[] = $endDate;
    }

    $sql .= " ORDER BY t.start_date ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $tours = $stmt->fetchAll();

    // Get images for each tour
    foreach ($tours as &$tour) {
        $stmtImg = $pdo->prepare("SELECT image_path FROM tour_images WHERE tour_id = ? ORDER BY sort_order ASC");
        $stmtImg->execute([$tour['id']]);
        $tour['images'] = $stmtImg->fetchAll(PDO::FETCH_COLUMN);
    }

    echo json_encode(['status' => 'success', 'data' => $tours]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
