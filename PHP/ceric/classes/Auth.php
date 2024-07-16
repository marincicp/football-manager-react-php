<?php
require_once 'Dbh.php';

class Auth extends Dbh
{

    public function __construct()
    {

        parent::__construct();
    }


    public function login($username, $password)
    {


        $sql = "SELECT * FROM users WHERE username = ?";

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();


            if (password_verify($password, $user["password"])) {

                $_SESSION["logged_in"] = true;
                $_SESSION['username'] = $username;

                $stmt->close();
                return ["success" => true, "user" => ["id" => $user["user_id"], "username" => $user["username"], "is_admin" => $user["is_admin"]]];
            } else {
                $stmt->close();
                return ["success" => false, "user" => null, "message" => "Pogrešna lozinka."];
            }
        } else {
            $stmt->close();
            return ["success" => false, "user" => null, "message" => "Pogrešan username."];
        }
    }

    public function is_Authenticated()
    {

        if (isset($_SESSION["logged_in"])) {
            return true;
        } else {
            return false;
        }
    }


    public function logout()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        unset($_SESSION["logged_in"]);
        // session_destroy();

        $this->is_Authenticated();

        return ["success" => true, "user" => null, "message" => "Logout successful."];
    }


    public function insert_admin()
    {
        $username = "user";
        $password = "user";

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, password) VALUES (?,?)";

        $run = $this->conn->prepare($sql);
        $run->bind_param("ss", $username, $hashed_password);
        $run->execute();
    }
}
