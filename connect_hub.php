<?php
// --- MASTER ACCESS HEADERS (SOVEREIGN SECURITY) ---
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --- ORACLE 23ai VAULT CONNECTION ---
$username = "ADMIN"; 
$password = "BiSMILLAh7&"; 
$connection_string = "23ai_34ui2_high"; 

$conn = oci_connect($username, $password, $connection_string);

if (!$conn) {
    $e = oci_error();
    echo json_encode(["success" => false, "message" => "Oracle Vault Connection Failed"]);
    exit;
}

// CAPTURING THE GITHUB STRIKE
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // --- STRIKE 1: SIGNUP (From signup.html) ---
    if (isset($data['full_name']) && !isset($data['message'])) {
        $sql = "INSERT INTO AK_HUB_VAULT (full_name, email, password, whatsapp_no, father_name, monthly_income, preferred_timing, location, department, user_role) 
                VALUES (:fn, :em, :pw, :wa, :ft, :inc, :tim, :loc, :dept, :role)";
        $stmt = oci_parse($conn, $sql);
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
    } 
    
    // --- STRIKE 2: CONTACT (From contact.html) ---
    else if (isset($data['message'])) {
        $sql = "INSERT INTO AK_HUB_MESSAGES (sender_name, sender_email, sender_phone, message_text) 
                VALUES (:nm, :em, :ph, :msg)";
        $stmt = oci_parse($conn, $sql);
        oci_bind_by_name($stmt, ':nm', $data['name']);
        oci_bind_by_name($stmt, ':em', $data['email']);
        oci_bind_by_name($stmt, ':ph', $data['number']);
        oci_bind_by_name($stmt, ':msg', $data['message']);
    }

    // --- STRIKE 3: LOGIN (From signin.html) ---
    else if (isset($data['email']) && isset($data['password'])) {
        $sql = "SELECT FULL_NAME, USER_ROLE FROM AK_HUB_VAULT WHERE EMAIL = :em AND PASSWORD = :pw";
        $stmt = oci_parse($conn, $sql);
        oci_bind_by_name($stmt, ':em', $data['email']);
        oci_bind_by_name($stmt, ':pw', $data['password']);
    }

    $result = oci_execute($stmt);

    if ($result) {
        if (isset($data['email']) && isset($data['password']) && !isset($data['full_name'])) {
            $row = oci_fetch_array($stmt, OCI_ASSOC);
            if ($row) {
                echo json_encode(["success" => true, "user" => ["full_name" => $row['FULL_NAME'], "role" => $row['USER_ROLE']]]);
            } else {
                echo json_encode(["success" => false, "message" => "Invalid Credentials"]);
            }
        } else {
            echo json_encode(["success" => true, "message" => "Vault Updated Successfully"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Vault Execution Error"]);
    }
    oci_free_statement($stmt);
}

oci_close($conn);
?>
