<?php

function uploadFile(array $file, bool $avatar, string $prefix = ''): string {
	$uploadPath = __DIR__ . '/../uploads';
	$avatarsPath = $uploadPath . '/avatars';
	$postsPath = $uploadPath . '/posts';

	if (!is_dir($uploadPath)) {
		mkdir($uploadPath, 0755, true);
	}

	//if (!is_dir($avatarsPath)) {
	//	mkdir($avatarsPath, 0755, true);
	//}
	if ($avatar) {
		if (!is_dir($avatarsPath)) {
			mkdir($avatarsPath, 0755, true);
		}
		$targetPath = $avatarsPath;
	} else {
		if (!is_dir($postsPath)) {
			mkdir($postsPath, 0755, true);
		}
		$targetPath = $postsPath;
	}

	$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
	$filename = $prefix . '_' . time() . ".$ext";

	$fullPath = $targetPath . '/' . $filename;

	//if (!move_uploaded_file($file['tmp_name'], $avatarsPath . '/' . $filename)) {
	//	die('An error occurred while uploading the file to the server');
	//}
	$fullPath = $targetPath . '/' . $filename;

	if (!move_uploaded_file($file['tmp_name'], $fullPath)) {
		die('An error occurred while uploading the file to the server');
	}

	//return '/uploads/avatars/' . $filename;
	return ($avatar ? '/uploads/avatars/' : '/uploads/posts/') . $filename;
}

?>