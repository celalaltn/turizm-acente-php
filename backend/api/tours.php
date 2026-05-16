<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow CORS for development

require_once '../db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Basic tour listing logic
    // Could filter by start_date and end_date if provided
    $startDate = $_GET['start_date'] ?? null;
    $endDate = $_GET['end_date'] ?? null;

    $sql = "SELECT * FROM tours WHERE 1=1";
    $params = [];

    if ($startDate && $endDate) {
        $sql .= " AND start_date >= ? AND end_date <= ?";
        $params[] = $startDate;
        $params[] = $endDate;
    }

    // Prepare and execute (commented out until db is created)
    /*
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $tours = $stmt->fetchAll();
    */

    // Dummy data for now
    $tours = [
        [
            'id' => 1,
            'title' => 'Kapadokya Turu',
            'description' => 'Özel fiyatlarla peribacalarını keşfedin.',
            'price' => 1500,
            'quota' => 20,
            'start_date' => '2026-06-01',
            'end_date' => '2026-06-05',
        ]
    ];

    echo json_encode(['status' => 'success', 'data' => $tours]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
