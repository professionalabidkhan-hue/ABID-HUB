<?php
// --- FOUNDER ANALYTICS HEADERS ---
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$username = "ADMIN"; 
$password = "BiSMILLAh7&"; 
$connection_string = "23ai_34ui2_high"; 

$conn = oci_connect($username, $password, $connection_string);

// THE MASTER SUMMARIES
$analytics = [];

// 1. Total Student Count
$s1 = oci_parse($conn, "SELECT COUNT(*) AS TOTAL FROM AK_HUB_VAULT");
oci_execute($s1);
$analytics['total_members'] = oci_fetch_array($s1, OCI_ASSOC)['TOTAL'];

// 2. Department Breakdown (AI, Web, Python, etc.)
$s2 = oci_parse($conn, "SELECT DEPARTMENT, COUNT(*) AS COUNT FROM AK_HUB_VAULT GROUP BY DEPARTMENT");
oci_execute($s2);
while ($row = oci_fetch_array($s2, OCI_ASSOC)) {
    $analytics['departments'][] = $row;
}

// 3. Global Location Strike
$s3 = oci_parse($conn, "SELECT LOCATION, COUNT(*) AS COUNT FROM AK_HUB_VAULT GROUP BY LOCATION");
oci_execute($s3);
while ($row = oci_fetch_array($s3, OCI_ASSOC)) {
    $analytics['locations'][] = $row;
}

echo json_encode($analytics);
oci_close($conn);
?>
