<?php
$a = 'dosadinko';
$b = 'dosadinko';

$username = $_POST['username'];
$password = $_POST['password'];

if($a == $username && $b == $password){
    echo json_encode('ulogovan');
    return;
}
echo json_encode('nije ulogovan');
