
<?php  
session_start();  
 $connect = mysqli_connect("192.168.2.12", "webuser", "admin", "my_database") or die("Unable to Connect to dbserver");  
$return_arr = array();
  $query = "SELECT * FROM notes";
	 
     $result = mysqli_query($connect, $query);  
while($row = mysqli_fetch_array($result)){
    $note = $row['note'];

    $return_arr[] = array("note" => $note);
}
	 header('Content-Type: application/json');

   echo json_encode($return_arr);
      
 

 ?>