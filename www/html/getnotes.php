
<?php  
session_start();  
$connect = mysqli_connect("db-cosc349-suppanut.chefvynnvuzl.ap-southeast-2.rds.amazonaws.com", "admin", "test1234", "my_database") or die("Unable to Connect to dbserver");   
$return_arr = array();
  $query = "SELECT * FROM notes";
	 
     $result = mysqli_query($connect, $query);  
while($row = mysqli_fetch_array($result)){
    $note = $row['note'];
	$subject = $row['subject'];
	$id = $row['noteId'];
	$user = $row['username'];
	$date = $row['currDate'];

    $return_arr[] = array("note" => $note, "subject" => $subject, "id" => $id, "username" => $user, "date" => $date);
}
	 header('Content-Type: application/json');

   echo json_encode($return_arr);
      
 

 ?>