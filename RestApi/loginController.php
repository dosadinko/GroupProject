<?php
require_once ('../model/connection.php');
$date = new DateTime();
$true_date = $date->getTimestamp();
$query = "INSERT INTO expences (description, payee, amount_payed, currency_type, expence_date, payed_date) values ('heroin', 'dinko', 243, 'BAM', $true_date, $true_date)";
mysqli_query($conn,$query);