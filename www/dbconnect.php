
<?php  
session_start();  
 $connect = mysqli_connect("192.168.2.12", "webuser", "admin", "my_database") or die("Unable to Connect to dbserver");  
$rows=null;
 if(!empty($_POST['username']))  
 {  
      $query = "SELECT * FROM users 
	  WHERE username = '".$_POST['username']."'  
      AND pin = '".$_POST['pin']."'  
      "; 
	 
      $result = mysqli_query($connect, $query);  
	 $rows=mysqli_fetch_row($result);
	 //echo $rows;
	 if($rows[1]==$_POST['pin']){
		 echo 1;
	 }
	 else{
		 echo 'incorrect';
	 }
      
 }


 ?>