<?php

	header("Content-Type: application/json");

	require_once '../config/connect.php';

	$id = $_GET['id'] ?? null;

	if ($id) {
		$stmt = mysqli_prepare($connect, "SELECT * FROM `items` WHERE `created_by` = ?");
		mysqli_stmt_bind_param($stmt, "i", $id);
		mysqli_stmt_execute($stmt);
		$result = mysqli_stmt_get_result($stmt);
		$items = [];

		while ($row = mysqli_fetch_assoc($result)) {
			$items[] = $row;
		}

		echo json_encode($items);
	} else {
		http_response_code(400);
		echo json_encode('User ID is required');
	}

	$connect->close();
?>