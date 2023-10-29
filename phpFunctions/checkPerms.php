<?php
    include 'UserManagement.php';
    $user = $_POST("username");
    $perms = Management::checkUserCreds($user);
    echo $perms;
?>