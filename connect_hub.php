<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Oracle Connection Details
// THE MASTER VAULT ACCESS
$username = "ADMIN"; // Usually 'ADMIN' for Oracle Cloud unless you created a specific user
$password = "BiSMILLAh7&"; 
// THE 23ai TARGET
// This is the name found in your 'tnsnames.ora' file or your Cloud Console
$connection_string = "23ai_34ui2_high"; 
// THE MASTER CONNECTION PULSE
$conn = oci_connect($username, $password, $connection_string);
if (!$conn) {
    $e = oci_error();
    echo json_encode(["success" => false, "message" => "Oracle Connection Failed: " . $e['message']]);
    exit;
}
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // SQL for the Tremendous Database Holder
    $sql = "INSERT INTO AK_HUB_VAULT (full_name, email, password, whatsapp_no, father_name, monthly_income, preferred_timing, location, department, user_role) 
            VALUES (:fn, :em, :pw, :wa, :ft, :inc, :tim, :loc, :dept, :role)";
    $stmt = oci_parse($conn, $sql);
    // Bind values to prevent SQL Injection (Strategic Security)
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
        echo json_encode(["success" => false, "message" => "Oracle Insert Error: " . $e['message']]);
    }
}

oci_free_statement($stmt);
oci_close($conn);

?>
