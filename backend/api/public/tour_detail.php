<?php
// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../db.php';

$tourId = $_GET['id'] ?? null;
$lang = $_GET['lang'] ?? 'TR';

if (!$tourId) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Tour ID is required']);
    exit;
}

try {
    // Fetch tour metadata and translation
    $sql = "SELECT t.id, t.price, t.quota, t.start_date, t.end_date, 
                   tt.title, tt.description, tt.special_conditions
            FROM tours t
            JOIN tour_translations tt ON t.id = tt.tour_id
            WHERE t.id = ? AND tt.lang_code = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$tourId, $lang]);
    $tour = $stmt->fetch();

    if (!$tour) {
        // If not found in requested language, fallback to first available translation
        $sqlFallback = "SELECT t.id, t.price, t.quota, t.start_date, t.end_date, 
                               tt.title, tt.description, tt.special_conditions
                        FROM tours t
                        JOIN tour_translations tt ON t.id = tt.tour_id
                        WHERE t.id = ? LIMIT 1";
        $stmtFallback = $pdo->prepare($sqlFallback);
        $stmtFallback->execute([$tourId]);
        $tour = $stmtFallback->fetch();
    }

    if (!$tour) {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Tour not found']);
        exit;
    }

    // Get all images for the tour
    $stmtImg = $pdo->prepare("SELECT image_path FROM tour_images WHERE tour_id = ? ORDER BY sort_order ASC");
    $stmtImg->execute([$tourId]);
    $tour['images'] = $stmtImg->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode(['status' => 'success', 'data' => $tour]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
