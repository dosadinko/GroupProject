<?php
session_start();
if ($_SESSION['id'] < 1 || $_SESSION == null){
    echo json_encode('authentication failed');
    return;
}

require_once '../model/utils.php';

$id = $_GET['id'];

$out = [];
$result = getExpenceById($id);
while($row = mysqli_fetch_assoc($result)){
    $out['description'] = $row['description'];
    $out['payee'] = $row['payee'];
    $out['amountPayed'] = $row['amount_payed'];
    $out['currencyType'] = $row['currency_type'];
    $out['expenceDate'] = $row['expence_date'];
    $out['payedDate'] = $row['payed_date'];
    $out['accountId'] = $row['account_id'];
};

echo json_encode($out);