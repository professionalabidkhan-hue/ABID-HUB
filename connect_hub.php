// --- MASTER ACCESS HEADERS (CRUSHING CORS BLOCKS) ---
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Handle pre-flight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ... (Your Connection Logic here) ...

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // --- GATE 1: SIGNUP (The Sovereign Identity Strike) ---
    // We check for full_name and ensure it's not a message/OTP action
    if (isset($data['full_name']) && !isset($data['message']) && !isset($data['action'])) {
        
        $sql = "INSERT INTO AK_HUB_VAULT (
                    FULL_NAME, USER_EMAIL, PASSWORD, CONTACT_NO, 
                    FATHER_NAME, MONTHLY_INCOME, PREFERRED_TIMING, 
                    LOCATION, DEPARTMENT, USER_ROLE, CREATED_AT
                ) VALUES (
                    :fn, :em, :pw, :wa, 
                    :ft, :inc, :tim, :loc, :dept, :role, CURRENT_TIMESTAMP
                )";
        
        $stmt = oci_parse($conn, $sql);
        
        // --- DATA BINDING (THE 13 PILLARS ALIGNMENT) ---
        oci_bind_by_name($stmt, ':fn', $data['full_name']);
        oci_bind_by_name($stmt, ':em', $data['email']);
        oci_bind_by_name($stmt, ':pw', $data['password']); // The Sovereign Key
        oci_bind_by_name($stmt, ':wa', $data['whatsapp_no']);
        oci_bind_by_name($stmt, ':ft', $data['father_name']);
        oci_bind_by_name($stmt, ':inc', $data['monthly_income']);
        oci_bind_by_name($stmt, ':tim', $data['preferred_timing']);
        oci_bind_by_name($stmt, ':loc', $data['location']);
        oci_bind_by_name($stmt, ':dept', $data['department']);
        oci_bind_by_name($stmt, ':role', $data['role']); 
        
        // --- THE EXECUTION STRIKE ---
        $result = @oci_execute($stmt); // Use @ to handle errors through our custom logic
        
        if($result) {
            oci_commit($conn);
            echo json_encode([
                "success" => true, 
                "message" => "VAULT ENTRY SUCCESS: Identity Secured for " . $data['full_name']
            ]);
        } else {
            $e = oci_error($stmt);
            // If it fails, the Think Tank provides the exact reason (e.g., Unique Constraint violation)
            echo json_encode([
                "success" => false, 
                "message" => "VAULT REJECTION: " . $e['message']
            ]);
        }
    }
    // ... (Gate 2 and Gate 5 logic follows) ...
}
