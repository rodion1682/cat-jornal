<?php

	header("Content-Type: application/json");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Allow-Headers: Content-Type");

	require_once '../config/connect.php';

	$categories = mysqli_query($connect, "SELECT * FROM `categories`");
	$categories = mysqli_fetch_all(	$categories, MYSQLI_ASSOC);
	echo json_encode($categories);

	$connect->close();
?>