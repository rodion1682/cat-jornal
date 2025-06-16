<?php

	session_start();

	require_once '../config/connect.php';

	$email = $_POST['email'] ?? null;
	$password = $_POST['password'] ?? null;

	if (!$email || !$password) {
		http_response_code(400);
		echo json_encode('Email and password are required.');
		exit;
	}

	// Fetch user by email
	$stmt = $connect->prepare("SELECT id, name, email, password, profile_picture FROM users WHERE email = ?");
	$stmt->bind_param("s", $email);
	$stmt->execute();
	$result = $stmt->get_result();

	if ($result->num_rows === 0) {
		http_response_code(401);
		echo json_encode('Invalid email or password.');
		exit;
	}

	$user = $result->fetch_assoc();

	if (!password_verify($password, $user['password'])) {
		http_response_code(401); 
		echo json_encode('Invalid email or password.');
		exit;
	}

	unset($user['password']);
	echo json_encode($user);

  	$connect->close();
?>
