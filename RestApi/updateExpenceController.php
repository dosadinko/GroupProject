<?php
require_once '../model/utils.php';
$id = $_POST['id'];
$expenceDate = $_POST['expenceDate'];
$payedDate = $_POST['payedDate'];
$description = $_POST['description'];
$payee = $_POST['payee'];
$amountPayed = $_POST['amountPayed'];
$currencyType = $_POST['currencyType'];

$result = updateExpence($id,$description,$payee,$amountPayed,$currencyType,$expenceDate,$payedDate);

echo json_encode('success');
