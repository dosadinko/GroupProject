<?php
require_once '../model/utils.php';

$username = $_POST['username'];
$password = $_POST['password'];

$user = loginCheckByMail($username,$password);
if ($user == 'empty'){
    $user1 = loginCheckByUsername($username,$password);
    if($user1 == 'empty'){
        echo json_encode(['error' => 'Username/Password wrong']);
        return;
    } else {
        echo json_encode($user1);
        return;
    }
}
echo json_encode($user);

