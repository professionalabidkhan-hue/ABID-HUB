<?php
// --- MASTER ACCESS HEADERS (TREMENDOUS SECURITY) ---
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// THE HANDSHAKE: Catch the "Options" request browsers send before the actual data
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --- ORACLE 23ai VAULT CONNECTION ---
$username = "ADMIN"; 
$password = "BiSMILLAh7&"; 
$connection_string = "23ai_34ui2_high"; 

// THE MASTER CONNECTION PULSE
$conn = oci_connect($username, $password, $connection_string);

if (!$conn) {
    $e = oci_error();
    echo json_encode(["success" => false, "message" => "Oracle Vault Connection Failed: " . $e['message']]);
    exit;
}

// CAPTURING THE INCOMING DATA FROM GITHUB
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // SQL FOR THE TREMENDOUS DATABASE HOLDER
    $sql = "INSERT INTO AK_HUB_VAULT (
                full_name, email, password, whatsapp_no, father_name, 
                monthly_income, preferred_timing, location, department, user_role
            ) VALUES (
                :fn, :em, :pw, :wa, :ft, :inc, :tim, :loc, :dept, :role
            )";
            
    $stmt = oci_parse($conn, $sql);

    // BINDING VALUES (PREVENTING SQL STRIKES)
    oci_bind_by_name($stmt, ':fn', $data['full_name']);
    oci_bind_by_name($stmt, ':em', $data['email']);
    oci_bind_by_name($stmt, ':pw', $data['password']);
    oci_bind_by_name($stmt, ':wa', $data['whatsapp_no']);
    oci_bind_by_name($stmt, ':ft', $data['father_name']);
    oci_bind_by_name($stmt, ':inc', $data['monthly_income']);
    oci_bind_by_name($stmt, ':tim', $data['preferred_timing']);
    oci_bind_by_name($stmt, ':loc', $data['location']);
    oci_bind_by_name($stmt, ':dept', $data['department']);
    oci_bind_by_name($stmt, ':role', $data['user_role']);

    $result = oci_execute($stmt);

    if ($result) {
        echo json_encode(["success" => true, "message" => "Data Secured in Oracle Vault"]);
    } else {
        $e = oci_error($stmt);
        echo json_encode(["success" => false, "message" => "Vault Entry Error: " . $e['message']]);
    }
    
    oci_free_statement($stmt);
}

oci_close($conn);
?>
