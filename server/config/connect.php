<?php
	$connect = mysqli_connect("127.127.126.25", "root", "", "crud");
	if(!$connect) {
		die('Unable to connect to database');
	}
?>