<?php
session_start();
if ($_SESSION['id'] < 1){
    echo json_encode('authentication failed');
    return;
}

require_once '../model/utils.php';
$result = getExpencesByUserId($_SESSION['id']);
$out = 0;

while($row = mysqli_fetch_assoc($result)){
    $out += $row['amount_payed'];
}

echo json_encode($out);