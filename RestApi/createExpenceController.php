<?php
require_once '../model/utils.php';
require_once '../model/connection.php';

$description = $_POST['description'];
$payee = $_POST['payee'];
$amountPayed = $_POST['amountPayed'];
$currencyType = $_POST['currencyType'];
$expenceDate = $_POST['expenceDate'];
$payedDate = $_POST['payedDate'];
$accountId = $_POST['accountId'];
$connection = getConnection();

$result = createExpence($description, $payee, $amountPayed, $currencyType, $expenceDate, $payedDate, $accountId);
echo json_encode('success');
