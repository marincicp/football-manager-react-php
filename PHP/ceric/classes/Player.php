<?php

require_once 'Dbh.php';
class Player extends Dbh
{


    public function __construct()
    {
        parent::__construct();
    }



    public function getTotalDebt()
    {
        $sql = "SELECT SUM(debt)  as total_debt FROM players";
        $res_total_debt = $this->conn->query($sql);
        return $res_total_debt->fetch_assoc()["total_debt"];
    }
    public function getTotalPaid()
    {
        $sql = "SELECT SUM(paid)  as total_paid FROM players";
        $res_total_paid = $this->conn->query($sql);
        return $res_total_paid->fetch_assoc()["total_paid"];
    }

    public function getAllPlayers($month = null)
    {


        $sql = "SELECT p.player_id, p.name, p.dob, p.created_at, p.debt, p.paid, 
                   COUNT(t.training_id) AS total_trainings, 
                   SUM(CASE WHEN a.attended = 1 THEN 1 ELSE 0 END) AS attended_trainings 
            FROM Players p 
            LEFT JOIN Attendance a ON p.player_id = a.player_id 
            LEFT JOIN trainings t ON a.training_id = t.training_id";

        if ($month) {
            $sql .= " WHERE DATE_FORMAT(t.date, '%M') = ?";
        }

        $sql .= " GROUP BY p.player_id, p.name, p.dob, p.created_at
              ORDER BY attended_trainings DESC";

        $stmt = $this->conn->prepare($sql);

        if ($month) {
            $stmt->bind_param("s", $month);
        }

        $stmt->execute();
        $res = $stmt->get_result();

        if ($res) {
            $players = $res->fetch_all(MYSQLI_ASSOC);

            $total_debt = $this->getTotalDebt();
            $total_paid = $this->getTotalPaid();
            $last_training_date = $this->getLastTrainingDate();

            return [
                'success' => true,
                'players' => $players,
                "total_debt" => $total_debt,
                "total_paid" => $total_paid,
                "last_training_date" => $last_training_date,
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Failed to fetch players',
                'error' => $this->conn->error
            ];
        }
    }


    public function addPlayer($name, $dob)
    {

        $sql = "INSERT INTO players (name,dob) VALUES (?,?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("si", $name, $dob);

        $stmt->execute();
        if ($stmt->errno) {
            return ["success" => false, "message" => "Failed to add a new player"];
        }
        $stmt->close();

        return ["success" => true,  'message' => 'New player added successfully'];
    }

    public function getLastTrainingDate()
    {

        $stmt = $this->conn->query("SELECT MAX(date) AS last_training_date FROM trainings");


        return $stmt->fetch_assoc()["last_training_date"];
    }

    public function addDebt($player_id)
    {
        $sql = "UPDATE players SET debt = debt + 1 WHERE player_id = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $player_id);
        $stmt->execute();

        if ($stmt->errno || $stmt->affected_rows === 0) {

            return ["success" => false, "message" => "Failed to execute statement"];
        }
        $stmt->close();
        return ["success" => true, "message" => "Debt added successfully"];
    }


    public function payEuro($player_id)
    {
        // $player_id = 3444;
        $sql = "UPDATE players SET paid = paid + 1 WHERE player_id = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $player_id);
        $stmt->execute();

        if ($stmt->errno || $stmt->affected_rows === 0) {

            return ["success" => false, "message" => "Failed to execute statement"];
        }
        $stmt->close();
        return ["success" => true, "message" => "Debt added successfully"];
    }


    public function addTrainingInfo($data)
    {

        $now = date("Y-m-d H:i:s");
        $res = $this->conn->query("INSERT INTO trainings (date) VALUES ('$now')");

        if ($res) {
            $training_id = $this->conn->insert_id;
        } else {
            return ["success" => false, "message" => 'Failed to insert training',  'error' => $this->conn->error];
        }


        $sql = "INSERT INTO attendance (training_id ,player_id, attended) VALUES (?,?,?)";
        foreach ($data as $player) {

            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("iii", $training_id, $player["player_id"], $player["attended"]);

            $stmt->execute();

            if ($stmt->errno) {
                return ["success" => false, "message" => 'Failed to execute statement',  'error' => $stmt->error];
            }
            $stmt->close();
        }

        return [
            'success' => true,
            'message' => 'Training information added successfully'
        ];
    }

    public function getAllTrainingMonths()

    {
        $sql = "SELECT month
FROM (
    SELECT DISTINCT DATE_FORMAT(date, '%M') AS month, MONTH(date) as month_num
    FROM trainings
) AS subquery
ORDER BY month_num";

        $res = $this->conn->query($sql);

        if ($res) {

            $months =    $res->fetch_all(MYSQLI_ASSOC);

            return ["success" => true, "message" => "Months fetched successfully.", "months" => $months];
        } else {

            return ["success" => false, "message" => "Faild to fetch months.",];
        }
    }
}
