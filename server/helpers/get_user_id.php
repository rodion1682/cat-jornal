<?php

function getUserId(mysqli $connect, string $email): ?int {
	$stmt = $connect->prepare("SELECT id FROM users WHERE email = ?");
	$stmt->bind_param("s", $email);
	$stmt->execute();

	$result = $stmt->get_result();
	if ($row = $result->fetch_assoc()) {
		return (int) $row['id'];
	}

	return null;
}

?>