<?php
	require_once '../config/connect.php';

	header("Content-Type: application/json");
	header("Access-Control-Allow-Methods: PUT, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type");

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		http_response_code(200);
		exit();
	}

	$id = $_GET['id'] ?? null;

	if ($_SERVER['REQUEST_METHOD'] === 'POST' && $id) {
		try {
			$title = '';
			$description = '';
			$imagePath = null;
			$categoryId = '';

			// 1. Get current image to delete if replaced
			$selectStmt = $connect->prepare("SELECT image_path FROM items WHERE id = ?");
			$selectStmt->bind_param("i", $id);
			$selectStmt->execute();
			$result = $selectStmt->get_result();
			$currentItem = $result->fetch_assoc();
			$currentImagePath = $currentItem['image_path'] ?? null;
			$absoluteOldPath = $currentImagePath ? realpath(__DIR__ . '/../' . ltrim($currentImagePath, '/')) : null;

			$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

			if (strpos($contentType, 'multipart/form-data') !== false) {
				$title = $_POST['title'] ?? '';
				$description = $_POST['description'] ?? '';
				$categoryId = $_POST['category_id'] ?? '';

				if (!empty($_FILES['image']['tmp_name'])) {
					$uploadDir = __DIR__ . '/../uploads/posts/';
					if (!file_exists($uploadDir)) {
						mkdir($uploadDir, 0755, true);
					}

					$filename = uniqid('post_') . '_' . basename($_FILES['image']['name']);
					$targetPath = $uploadDir . $filename;

					if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
						$imagePath = '/uploads/posts/' . $filename;

						// 2. Delete old image
						if ($absoluteOldPath && file_exists($absoluteOldPath)) {
							unlink($absoluteOldPath);
						}
					}
				}
			} else {
				$input = json_decode(file_get_contents('php://input'), true);
				$title = $input['title'] ?? '';
				$description = $input['description'] ?? '';
				$categoryId = $input['category_id'] ?? '';
			}

			// 3. Update DB
			if ($imagePath !== null) {
				$stmt = $connect->prepare("UPDATE items SET title=?, description=?, category_id=?, image_path=? WHERE id=?");
				$stmt->bind_param("ssdsi", $title, $description, $categoryId, $imagePath, $id);
			} else {
				$stmt = $connect->prepare("UPDATE items SET title=?, description=?, category_id=? WHERE id=?");
				$stmt->bind_param("ssdi", $title, $description, $categoryId, $id);
			}

			if ($stmt->execute()) {
				$stmt = $connect->prepare("SELECT * FROM items WHERE id = ?");
				$stmt->bind_param("i", $id);
				$stmt->execute();
				$result = $stmt->get_result();
				$updatedItem = $result->fetch_assoc();

				echo json_encode([
					'success' => true,
					'item' => $updatedItem
				]);
			} else {
				throw new Exception("Database update failed: " . $stmt->error);
			}
		} catch (Exception $e) {
			http_response_code(400);
			echo json_encode([
				'success' => false,
				'error' => $e->getMessage()
			]);
		}
	} else {
		http_response_code(405);
		echo json_encode(['success' => false, 'error' => 'Method not allowed or missing ID']);
	}

	$connect->close();
?>