<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "sqlxxx.freesql.com"; // Your FreeSQL Server
$user = "YOUR_DB_USER";
$pass = "YOUR_DB_PASSWORD";
$db   = "YOUR_DB_NAME";

$conn = new mysqli($host, $user, $pass, $db);
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    // Special Founder Backdoor
    if ($email === 'professionalabidkhan@gmail.com' && $password === 'YOUR_MASTER_PASS') {
        echo json_encode(["success" => true, "user" => ["full_name" => "Abid Khan", "role" => "Founder", "field" => "All"]]);
        exit;
    }

    $sql = "SELECT full_name, password, user_role, department FROM AK_USERS WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Use password_verify if you hashed passwords, otherwise direct comparison (less secure)
        if ($password === $row['password']) { 
            echo json_encode([
                "success" => true, 
                "user" => [
                    "full_name" => $row['full_name'],
                    "role" => $row['user_role'],
                    "field" => $row['department']
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid Password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Member Not Found"]);
    }
}
$conn->close();
?>