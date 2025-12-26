<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Oracle Connection Details
$username = "YOUR_ORACLE_USER";
$password = "YOUR_ORACLE_PASSWORD";
$connection_string = "YOUR_ORACLE_CLOUD_CONNECTION_STRING"; // e.g., (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=...)))

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