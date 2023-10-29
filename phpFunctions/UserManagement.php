<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
class Management
{
    private static $servername = "localhost";
    private static $DBusername = "wcsccsco_logit_admin";
    private static $DBpassword = "Echo#Co-op18!";
    private static $database = "wcsccsco_logit";
    private $port = 3306;

    public static $currentUser = "";

    //establishes the connection to the locally hosted server
    public static function connect()
    {
        $conn = new mysqli(Management::$servername, Management::$DBusername, Management::$DBpassword, Management::$database);
        if (mysqli_connect_errno()) {
            die('Error:' + mysqli_connect_error());
        }
        return $conn;
    }
    //adds the user to the database if their credientals dont exist yet
    public static function AddUser($email, $username, $password, $type)
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        if (Management::authenticate($email, $password)) { //user does not exist
            $conn = Management::connect();
            mysqli_query(
                $conn,
                "INSERT INTO userInfo 
                VALUES 
                (
                    '$email',
                    '$username',
                    '$password',
                    '$type'
                )"
            );
            mysqli_query(
                $conn,
                "INSERT INTO StandardData (teacher) VALUES(
                    '$username'
                )"
            );
            $conn->close();
            return true;

        } else {
            return false;
        }

    }
    public function DeleteUser($email, $username)
    {
    }
    //returns false if the user already exists.
    public static function authenticate($email, $password)
    {
        $conn = Management::connect();
        $query = mysqli_query($conn, "SELECT username FROM userInfo WHERE email = '$email' AND pwd = '$password'");
        $conn->close();
        if ($query->num_rows > 0) {
            return false;
        } else {

            return true;
        }
    }

    //returns the opposite of authenticate() above. If the account exists, it returns true.
    public static function authenticateForRegularLogin($email, $password)
    {
        $conn = Management::connect();
        $query = mysqli_query($conn, "SELECT username FROM userInfo WHERE email = '$email' AND pwd = '$password'");
        $conn->close();
        Management::$currentUser = $query;
        if ($query->num_rows > 0) {
            $name = $query->fetch_assoc()["username"];
            return $name;
        } else {
            return false;
        }
    }
}
?>