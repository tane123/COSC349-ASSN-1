
<?php  
session_start();  
 
 $connect = mysqli_connect("db-cosc349-suppanut.chefvynnvuzl.ap-southeast-2.rds.amazonaws.com", "admin", "test1234", "my_database") or die("Unable to Connect to dbserver"); 

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