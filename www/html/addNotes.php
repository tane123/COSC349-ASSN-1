
<?php  
session_start();  
 $connect = mysqli_connect("db-cosc349-suppanut.chefvynnvuzl.ap-southeast-2.rds.amazonaws.com", "admin", "test1234", "my_database") or die("Unable to Connect to dbserver"); 
$return_arr = array();

  $query = "INSERT INTO notes values('".$_POST['username']."', '".$_POST['note']."',  '".$_POST['subject']."', DEFAULT, CURDATE())";

 if(($result = mysqli_query($connect, $query))){
	 
	 echo 1;
		 exit;
 }
echo 0;
      
 ?>