<?php
session_start();
if ($_SESSION['id'] < 1 || $_SESSION == null){
    echo json_encode('authentication failed');
    return;
}

require_once '../model/utils.php';

$id = $_POST['id'];

$result = deleteExpenceById($id);

echo json_encode('success');