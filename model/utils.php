<?php
session_start();
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

function createExpence($description, $payee, $amountPayed, $currencyType, $expenceDate, $payedDate, $accountId){
    $connection = getConnection();
    $query = "INSERT INTO expences(description, payee, amount_payed, currency_type, expence_date, payed_date, account_id) values('$description', '$payee', $amountPayed, '$currencyType', $expenceDate, $payedDate, $accountId)";
    $result = mysqli_query($connection, $query);
    return $result;
}

function getExpenceById($id){
    $connection = getConnection();
    $query = "select * from expences where id=$id";
    $result = mysqli_query($connection, $query);
    return $result;
}

function getExpencesByUserId($accountId){
    $connection = getConnection();
    $query = "select * from expences where account_id=$accountId";
    $result = mysqli_query($connection, $query);
    return $result;
}

function deleteExpenceById($id){
    $connection = getConnection();
    $query = "delete from expences where id=$id";
    $result = mysqli_query($connection, $query);
    return $result;
}

