<?php

	session_start();

	require_once '../config/connect.php';
	require_once __DIR__ . '/../helpers/helpers.php';
	require_once __DIR__ . '/../helpers/get_user_id.php';

	$name = $_POST['name'] ?? null;
	$email = $_POST['email'] ?? null;
	$password = $_POST['password'] ?? null;
	$profile_picture = $_FILES['profile_picture'] ?? null;

	if (!$name || !$email || !$password) {
		http_response_code(400);
		echo json_encode('All fields are required.');
		exit;
	}

	// Check if email already exists
	$checkStmt = $connect->prepare("SELECT id FROM users WHERE email = ?");
	$checkStmt->bind_param("s", $email);
	$checkStmt->execute();
	$checkStmt->store_result();

	if ($checkStmt->num_rows > 0) {
		http_response_code(409);
		echo json_encode('Email already exists.');
		exit;
	}

	$profilePicture_path = null;
	if (!empty($profile_picture) && $profile_picture['error'] === UPLOAD_ERR_OK) {
		$profilePicture_path = uploadFile($profile_picture, true,'profile_picture');
	}

	$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

	$stmt = $connect->prepare("INSERT INTO users (name, email, password, profile_picture) VALUES (?, ?, ?, ?)");
	$stmt->bind_param("ssss", $name, $email, $hashedPassword, $profilePicture_path);
	$stmt->execute();

	if ($stmt->error) {
		http_response_code(500);
		echo json_encode($stmt->error);
		exit;
	}

	$userId = getUserId($connect, $email);

	echo json_encode([
		'id' => $userId,
		'name' => $name,
		'email' => $email,
		'profile_picture' => $profilePicture_path,
	]);
  	$connect->close();
?>
