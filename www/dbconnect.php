<!--https://www.webslesson.info/2016/11/make-login-form-by-using-bootstrap-modal-with-php-ajax-jquery.html-->
<?php  
 session_start();  
 $connect = mysqli_connect("192.168.2.11", "webuser", "1234", "fvision");  
 if(isset($_POST["username"]))  
 {  
      $query = "  
      SELECT * FROM users  
      WHERE username = '".$_POST["username"]."'  
      AND pin = '".$_POST["pin"]."'  
      ";  
      $result = mysqli_query($connect, $query);  
      if(mysqli_num_rows($result) > 0)  
      {  
           $_SESSION['username'] = $_POST['username'];  
           echo 'Yes';  
      }  
      else  
      {  
           echo 'No';  
      }  
 }  
 if(isset($_POST["action"]))  
 {  
      unset($_SESSION["username"]);  
 }  
 ?>