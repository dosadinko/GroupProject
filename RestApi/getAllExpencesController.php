<?php
session_start();
if ($_SESSION['id'] < 1 || $_SESSION == null){
    echo json_encode('authentication failed');
    return;
}

require_once '../model/utils.php';

$result = getExpencesByUserId($_SESSION['id']);
$out = ['expence' => []];

while($row = mysqli_fetch_assoc($result)){
    $expence = [];
    $expence['description'] = $row['description'];
    $expence['payee'] = $row['payee'];
    $expence['amountPayed'] = $row['amount_payed'];
    $expence['currencyType'] = $row['currency_type'];
    $expence['expenceDate'] = $row['expence_date'];
    $expence['payedDate'] = $row['payed_date'];
    $expence['accountId'] = $row['account_id'];
    array_push($out['expence'], $expence);
}

echo json_encode($out);
return;