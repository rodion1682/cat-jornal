<?php

	header("Content-Type: application/json");

	require_once '../config/connect.php';

	$id = $_GET['id'] ?? null;

	if ($id) {
		$stmt = mysqli_prepare($connect, "SELECT * FROM `users` WHERE `id` = ?");
		mysqli_stmt_bind_param($stmt, "i", $id);
		mysqli_stmt_execute($stmt);
		$result = mysqli_stmt_get_result($stmt);
		$user = mysqli_fetch_assoc($result);
		unset($user['password']);
		echo json_encode($user ?: ['error' => 'User not found']);
	}

	$connect->close();
?>