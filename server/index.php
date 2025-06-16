<?php

	header("Content-Type: application/json");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Allow-Headers: Content-Type");

	require_once 'config/connect.php';

	// Get the ID parameter from request
	$id = $_GET['id'] ?? null;

	if ($id) {
		// Fetch single item
		$stmt = mysqli_prepare($connect, "SELECT * FROM `items` WHERE `id` = ?");
		mysqli_stmt_bind_param($stmt, "i", $id);
		mysqli_stmt_execute($stmt);
		$result = mysqli_stmt_get_result($stmt);
		$item = mysqli_fetch_assoc($result);
		
		echo json_encode($item ?: ['error' => 'Item not found']);
	} else {
		// Fetch all items if no ID specified (original behavior)
		$items = mysqli_query($connect, "SELECT * FROM `items`");
		$items = mysqli_fetch_all($items, MYSQLI_ASSOC);
		echo json_encode($items);
}

?>