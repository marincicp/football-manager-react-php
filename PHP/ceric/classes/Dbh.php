<?php
class Dbh
{
    private $host = "localhost";
    private $db_user = "root";
    private $db_password = "";
    private $db_name = "mladost_ceric";
    protected $conn;

    public function __construct()
    {
        $this->conn = new mysqli($this->host, $this->db_user, $this->db_password, $this->db_name);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
}