<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "sqlxxx.freesql.com"; 
$user = "YOUR_DB_USER";
$pass = "YOUR_DB_PASSWORD";
$db   = "YOUR_DB_NAME";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$sql = "SELECT full_name, email, department, user_role FROM AK_USERS ORDER BY id DESC";
$result = $conn->query($sql);

$users = [];
while($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
$conn->close();
?>