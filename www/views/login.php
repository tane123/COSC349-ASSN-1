
<?php
db_host   = '192.168.188.52';
$db_name   = 'localhost';
$db_user   = 'user';
$db_passwd = '1234';

$pdo_dsn = "mysql:host=$db_host;dbname=$db_name";

$pdo = new PDO($pdo_dsn, $db_user, $db_passwd);

$q = $pdo->query("SELECT * FROM papers");

while($row = $q->fetch()){
  echo "<tr><td>".$row["code"]."</td><td>".$row["name"]."</td></tr>\n";
}
	
?>
