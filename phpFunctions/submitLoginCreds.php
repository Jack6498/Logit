<?php
#actually report errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'UserManagement.php';
$email = $_POST["email"];
$username = $_POST["fullName"];
$password = $_POST["password"];
$type = $_POST["type1"];
if(Management::AddUser($email, $username, $password, $type)) {
    #move user forward if that account is new
    Management::$currentUser = $username;
    echo"true";
} else {
    #send user back if that account already exists
    echo"false";
}
?> 