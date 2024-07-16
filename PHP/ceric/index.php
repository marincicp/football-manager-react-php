<?php
require_once "classes/Player.php";
require_once "classes/Auth.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

session_start();

$playerObj = new Player();
$authObj = new Auth();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


$method = $_SERVER['REQUEST_METHOD'];
$uri =  $_SERVER['REQUEST_URI'];
$parsed_url = parse_url($uri);
$path = $parsed_url["path"];

switch ($path) {
    case '/ceric/login':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['username']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid input']);
            break;
        }

        $res = $authObj->login($data["username"], $data["password"]);

        if ($res["success"]) {
            http_response_code(200);
            echo json_encode($res);
        } else {
            http_response_code(400);
            echo json_encode($res);
        }
        break;

    case '/ceric/logout':
        $res = $authObj->logout();

        if ($res["success"]) {
            http_response_code(200);
            echo json_encode($res);
        } else {
            http_response_code(400);
            echo json_encode($res);
        }
        break;

    case '/ceric/players':

        $filter = isset($_GET["month"]) ? $_GET["month"] : null;
        $res = $playerObj->getAllPlayers($filter);
        if ($res["success"]) {
            http_response_code(200);
            echo json_encode($res);
        } else {
            echo json_encode($res);
        }
        break;

    case '/ceric/players/addPlayer':

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['name']) || !isset($data['dob'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid input']);
            break;
        }

        $res = $playerObj->addPlayer($data["name"], $data["dob"]);

        if ($res["success"]) {
            http_response_code(200);
            echo json_encode($res);
        } else {
            http_response_code(400);
            echo json_encode($res);
        }
        break;

    case '/ceric/players/addDebt':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['player_id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Player ID is missing']);
            break;
        }


        $res =    $playerObj->addDebt($data['player_id']);

        if ($res["success"]) {
            http_response_code(200);
            json_encode($res);
        } else {
            echo json_encode($res);
        }
        break;
    case '/ceric/players/payEuro':

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['player_id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Player ID is missing']);
            break;
        }

        $res =    $playerObj->payEuro($data['player_id']);

        if ($ress["success"]) {
            http_response_code(200);
            json_encode($res);
        } else {
            echo json_encode($res);
        }
        break;

    case '/ceric/training/add':

        $data = json_decode(file_get_contents('php://input'), true);
        $res = $playerObj->addTrainingInfo($data["players"]);

        if ($res['success']) {
            http_response_code(200);
            echo json_encode($res);
        } else {
            echo json_encode($res);
        }
        break;

    case '/ceric/training/getMonths':

        $res = $playerObj->getAllTrainingMonths();

        if ($res['success']) {
            http_response_code(200);
            echo json_encode($res);
        } else {
            echo json_encode($res);
        }
        break;


    default:
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
        break;
}
