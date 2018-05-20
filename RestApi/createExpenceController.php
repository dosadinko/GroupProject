<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();}
if ($_SESSION['id'] < 1 || $_SESSION == null){
    echo json_encode('authentication failed');
    return;
}

require_once '../model/utils.php';

$expenceDate = $_POST['expenceDate'];
$payedDate = $_POST['payedDate'];
$description = $_POST['description'];
$payee = $_POST['payee'];
$amountPayed = $_POST['amountPayed'];
$currencyType = $_POST['currencyType'];
$accountId = $_SESSION['id'];

$result = createExpence($description, $payee, $amountPayed, $currencyType, $expenceDate, $payedDate, $accountId);
echo json_encode($result);
