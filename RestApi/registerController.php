<?php
require_once '../model/utils.php';
require_once '../model/connection.php';
$connection = getConnection();

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$safePassword = hash('sha256',$password);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode('Bad email format');
    return;
}

if (strlen($password) < 8){
    echo json_encode('Password must be greater than 7 characters');
    return;
}

if(0 == preg_match('~[0-9]~', $password)){
    echo json_encode('Password must contain at least 1 digit');
    return;
}

if(checkEmails($email) == 'error'){
    echo json_encode('Email already in use');
}

$query = "insert into accounts(email, password, username) values('$email', '$safePassword', '$username')";
$result = mysqli_query($connection, $query);

echo json_encode('success');

