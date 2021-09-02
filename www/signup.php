
<?php  
session_start();  
 $connect = mysqli_connect("192.168.2.12", "webuser", "admin", "my_database") or die("Unable to Connect to dbserver");  

 if(!empty($_POST['username']))  
 {  
      $query = "INSERT INTO users VALUES ('".$_POST['username']."', '".$_POST['pin']."')"; 
	 
      if($result = mysqli_query($connect, $query)){
		  echo 'success';
	  } else{
		  echo 'something went wrong';
	  }
 }

 ?>