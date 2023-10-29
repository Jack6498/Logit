<?php
#actually report errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../phpFunctions/UserManagement.php';
$email = $_POST["email"];
$password = $_POST["password"];
$user = Management::authenticateForRegularLogin($email, $password); //returns either false or the username 
if ($user != false) {
    $conn = Management::connect();
    $res = $conn->query("SELECT type FROM userInfo where username = '$user'"); //gets the perms for the user
    $type = $res->fetch_assoc()["type"];
    echo"$user,$type";
} else {
    echo"false";
}

?>