
<?php
//header('Content-Type: text/html; charset=utf-8');
$user = 'root';
$password = '';
$db = 'Bolao';
$host = 'localhost';
var_dump("TO AQUI!");
$port = 3306;

$link = mysql_connect(
   "$host:$port", 
   $user, 
   $password
);
//$link = mysqli_connect("$host:$port", $user, $password, $db);
$db_selected = mysql_select_db(
   $db, 
   $link
);


?>
