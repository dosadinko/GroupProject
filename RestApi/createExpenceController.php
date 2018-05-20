<?php
if ($_SESSION['id'] < 1 || $_SESSION == null){
    echo json_encode('authentication failed');
    return;
}

require_once '../model/utils.php';

$description = $_POST['description'];
$payee = $_POST['payee'];
$amountPayed = $_POST['amountPayed'];
$currencyType = $_POST['currencyType'];
$expenceDate = $_POST['expenceDate'];
$payedDate = $_POST['payedDate'];
$accountId = $_SESSION['id'];

$result = createExpence($description, $payee, $amountPayed, $currencyType, $expenceDate, $payedDate, $accountId);
echo json_encode('success');
