<?php
require_once 'connection.php';
require_once 'expence.php';
require_once 'account.php';

class utils {
    public function loginCheckByMail($email, $password){
        $connection = new connection();
        $query = "SELECT * FROM accounts WHERE email='$email' and password='$password'";
        $result = mysqli_query($connection->getConnection(), $query);
        if(empty($result)){
            return 'radi';
        }
        return $result;
    }
}