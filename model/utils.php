<?php
require_once 'connection.php';
require_once 'expence.php';
require_once 'account.php';

function loginCheckByMail($email, $plainPassword){
        $connection = getConnection();
        $password = hash('sha256',$plainPassword);
        $query = "SELECT * FROM accounts WHERE email='$email' and password='$password'";
        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) == 0){
            return 'empty';
        }
        $id = null;
        while($row = mysqli_fetch_assoc($result)){
            $id = $row['id'];
        }
        $_SESSION['id'] = $id;
        return 'success';
}

function loginCheckByUsername($username, $plainPassword){
        $connection = getConnection();
        $password = hash('sha256',$plainPassword);
        $query = "SELECT * FROM accounts where username='$username' and password='$password'";
        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) == 0){
            return 'empty';
        }
        $id = null;
        while($row = mysqli_fetch_assoc($result)){
            $id = $row['id'];
        }
        $_SESSION['id'] = $id;
        return 'success';
}