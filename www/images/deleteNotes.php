
<?php  
session_start();  
 $connect = mysqli_connect("192.168.2.12", "webuser", "admin", "my_database") or die("Unable to Connect to dbserver");  
$return_arr = array();

  $query = "DELETE FROM notes WHERE '".$_POST['id']."' == id";
	 
     if(($result = mysqli_query($connect, $query)){
	 	echo 1;
	 }  
 ?>