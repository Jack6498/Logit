<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include 'UserManagement.php';
$data = json_decode($_POST["data"], false);
$conn = Management::connect();
$dataString = "";
$currentUser = $_POST["user"];
if ($currentUser != null) {
    // name and true/false
    foreach ($data as $name => $checked) {
        if ($checked == true) {
            $name = 's' . $name;
            mysqli_query($conn, "UPDATE StandardData SET $name=$name + 1 WHERE teacher = '$currentUser'");
        }
        echo "posted to:$name, ";
    }
} else {
    echo "no current user";
}
?>