<?php
require_once '../model/connection.php';
$connection = getConnection();

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$safePassword = hash('sha256',$password);

$query = "insert into accounts(email, password, username) values('$email', '$safePassword', '$username')";
$result = mysqli_query($connection, $query);

echo json_encode('success');

