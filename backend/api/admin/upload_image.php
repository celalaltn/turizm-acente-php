<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../db.php';

$method = $_SERVER['REQUEST_METHOD'];
$uploadDir = '../../uploads/';

// Ensure uploads directory exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

try {
    if ($method === 'POST') {
        $tourId = $_POST['tour_id'] ?? null;

        if (!$tourId) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Tour ID is required']);
            exit;
        }

        // Check current image count to enforce limit of 8
        $stmtCount = $pdo->prepare("SELECT COUNT(*) FROM tour_images WHERE tour_id = ?");
        $stmtCount->execute([$tourId]);
        $currentCount = $stmtCount->fetchColumn();

        if (!isset($_FILES['images']) || !is_array($_FILES['images']['name'])) {
            echo json_encode(['status' => 'error', 'message' => 'No valid images provided']);
            exit;
        }

        $uploadedFilesCount = count($_FILES['images']['name']);
        
        if ($currentCount + $uploadedFilesCount > 8) {
            echo json_encode(['status' => 'error', 'message' => "Maksimum 8 fotoğraf eklenebilir. Şuan $currentCount fotoğrafınız var."]);
            exit;
        }

        $savedImages = [];
        
        for ($i = 0; $i < $uploadedFilesCount; $i++) {
            if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES['images']['tmp_name'][$i];
                $originalName = basename($_FILES['images']['name'][$i]);
                $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
                
                // Allow only specific extensions
                $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
                if (!in_array($extension, $allowed)) {
                    continue; // skip invalid files
                }

                $newName = uniqid('tour_') . '.' . $extension;
                $destination = $uploadDir . $newName;

                if (move_uploaded_file($tmpName, $destination)) {
                    // Save to DB
                    $imgPath = 'uploads/' . $newName;
                    $sortOrder = $currentCount + $i;
                    
                    $stmt = $pdo->prepare("INSERT INTO tour_images (tour_id, image_path, sort_order) VALUES (?, ?, ?)");
                    $stmt->execute([$tourId, $imgPath, $sortOrder]);
                    
                    $savedImages[] = [
                        'id' => $pdo->lastInsertId(),
                        'path' => $imgPath
                    ];
                }
            }
        }

        echo json_encode(['status' => 'success', 'message' => 'Fotoğraflar yüklendi', 'data' => $savedImages]);
    }
    elseif ($method === 'DELETE') {
        // Silme işlemi
        $imageId = $_GET['id'] ?? null;
        if (!$imageId) {
            echo json_encode(['status' => 'error', 'message' => 'Image ID is required']);
            exit;
        }

        // Db'den dosya yolunu al
        $stmt = $pdo->prepare("SELECT image_path FROM tour_images WHERE id = ?");
        $stmt->execute([$imageId]);
        $img = $stmt->fetch();

        if ($img) {
            $fullPath = '../../' . $img['image_path'];
            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
            $pdo->prepare("DELETE FROM tour_images WHERE id = ?")->execute([$imageId]);
            echo json_encode(['status' => 'success', 'message' => 'Fotoğraf silindi']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Fotoğraf bulunamadı']);
        }
    } else {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
}
?>
