<?php

	require_once '../config/connect.php';
	require_once __DIR__ . '/../helpers/helpers.php';

	$title = $_POST['title'] ?? null;
	$description = $_POST['description'] ?? null;
	$categoryId = $_POST['category_id'] ?? null;
	$createdBy = $_POST['created_by'] ?? null;
	$creatorsName = $_POST['creators_name'] ?? null;
	$creatorsPicture = $_POST['creators_picture'] ?? null;

	$image = $_FILES['image'] ?? null;
	$imagePath = null;
	
	if (!empty($image) && $image['error'] === UPLOAD_ERR_OK) {
		$imagePath = uploadFile($image, false, 'image');
	}

	if ($imagePath === null) {
		http_response_code(400);
		echo json_encode(['error' => 'Image is required.']);
		exit;
	}

	$stmt = $connect->prepare("INSERT INTO items (title, description, category_id, image_path, created_by, creators_name, creators_picture) VALUES (?, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param("ssissss", $title, $description, $categoryId, $imagePath, $createdBy, $creatorsName, $creatorsPicture);
	$stmt->execute();

	if ($stmt->error) {
		http_response_code(500);
		echo json_encode(['error' => $stmt->error]);
		exit;
	}

	echo json_encode([
		'title' => $title,
		'description' => $description,
		'categoryId' => $categoryId,
		'imagePath' => $imagePath,
		'createdBy' => $createdBy,
		'creatorsName' => $creatorsName,
		'creatorsPicture' => $creatorsPicture,
	]);

	$connect->close();
	
?>