<?php
	require_once '../config/connect.php';

	header("Access-Control-Allow-Methods: DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type");

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		http_response_code(200);
		exit();
	}

	if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
		$id = $_GET['id'] ?? null;

		try {
			// Validate ID
			if (!$id || $id <= 0) {
				http_response_code(400);
				echo json_encode(['error' => 'Invalid ID']);
				exit();
			}

			// 1. Fetch image path before deleting
			$imageQuery = $connect->prepare("SELECT image_path FROM items WHERE id = ?");
			$imageQuery->bind_param("i", $id);
			$imageQuery->execute();
			$imageResult = $imageQuery->get_result();
			$imageRow = $imageResult->fetch_assoc();

			if (!$imageRow) {
				http_response_code(404);
				echo json_encode(['error' => 'Item not found']);
				exit();
			}

			$imagePath = $imageRow['image_path'];
			$absoluteImagePath = __DIR__ . '/../' . ltrim($imagePath, '/'); // e.g., ../uploads/posts/filename.jpg

			// 2. Delete the image file if it exists
			if (file_exists($absoluteImagePath)) {
				unlink($absoluteImagePath);
			}

			// 3. Delete the item from DB
			$stmt = $connect->prepare("DELETE FROM items WHERE id = ?");
			$stmt->bind_param("i", $id);

			if ($stmt->execute()) {
				if ($stmt->affected_rows > 0) {
					echo json_encode([
						'success' => true,
						'message' => 'Item and image deleted successfully',
						'id' => $id
					]);
				} else {
					http_response_code(404);
					echo json_encode(['error' => 'Item not found']);
				}
			} else {
				throw new Exception("Delete failed");
			}

		} catch (Exception $e) {
			http_response_code(500);
			echo json_encode([
				'error' => 'Database error',
				'message' => $e->getMessage()
			]);
		}
	} else {
		http_response_code(405);
		echo json_encode(['error' => 'Method not allowed']);
	}

	$connect->close();
?>