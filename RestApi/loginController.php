<?php
require_once '../model/utils.php';

$a = new utils();
$a = $a->loginCheckByMail('dosadinko@hotmail.com', 'dosadinko95');
echo $a;