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

// --- MASTER FUNCTIONS INCLUDE ---
// Partner, we include your vault_functions.php here to use its specialized logic
include('vault_functions.php'); 

// --- ORACLE VAULT CONNECTION ---
$username = "ADMIN"; 
$password = "BiSMILLAh7&"; 
$connection_string = "23ai_34ui2_high"; 

$conn = oci_connect($username, $password, $connection_string);

if (!$conn) {
    $e = oci_error();
    echo json_encode(["success" => false, "message" => "Oracle Vault Connection Failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // --- GATE 1: SIGNUP ---
    if (isset($data['full_name']) && !isset($data['message'])) {
        $sql = "INSERT INTO AK_HUB_VAULT (full_name, email, password, whatsapp_no, father_name, monthly_income, preferred_timing, location, department) 
                VALUES (:fn, :em, :pw, :wa, :ft, :inc, :tim, :loc, :dept)";
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
        
        if(oci_execute($stmt)) {
            oci_commit($conn);
            echo json_encode(["success" => true, "message" => "Identity Secured"]);
        }
    }

    // --- GATE 2: CONTACT ---
    else if (isset($data['message'])) {
        $sql = "INSERT INTO AK_HUB_MESSAGES (sender_name, sender_email, sender_phone, message_text) VALUES (:nm, :em, :ph, :msg)";
        $stmt = oci_parse($conn, $sql);
        oci_bind_by_name($stmt, ':nm', $data['name']);
        oci_bind_by_name($stmt, ':em', $data['email']);
        oci_bind_by_name($stmt, ':ph', $data['number']);
        oci_bind_by_name($stmt, ':msg', $data['message']);
        
        if(oci_execute($stmt)) {
            oci_commit($conn);
            echo json_encode(["success" => true, "message" => "Message Delivered"]);
        }
    }

    // --- GATE 5: SOVEREIGN RECOVERY STRIKE ---
    else if (isset($data['action'])) {
        
        // ACTION A: SENDING THE CODE (Calls generateAndStoreOTP from vault_functions.php)
        if ($data['action'] == 'send_otp') {
            $otp = generateAndStoreOTP($conn, $data['email']);
            
            if ($otp) {
                echo json_encode(["success" => true, "message" => "OTP Sent to Vault", "debug_otp" => $otp]);
            } else {
                echo json_encode(["success" => false, "message" => "OTP Generation Failed"]);
            }
        }

        // ACTION B: VERIFY & RESET
        else if ($data['action'] == 'reset_password') {
            // Note: Ensure your AK_OTP_VAULT table has columns: USER_EMAIL, OTP_CODE, IS_USED, EXPIRY
            $sql = "SELECT * FROM AK_OTP_VAULT 
                    WHERE user_email = :em AND otp_code = :otp AND is_used = 0 
                    AND expiry > CURRENT_TIMESTAMP";
            
            $stmt = oci_parse($conn, $sql);
            oci_bind_by_name($stmt, ':em', $data['email']);
            oci_bind_by_name($stmt, ':otp', $data['otp']);
            oci_execute($stmt);

            if (oci_fetch($stmt)) {
                $updStmt = oci_parse($conn, "UPDATE AK_HUB_VAULT SET password = :pw WHERE email = :em");
                oci_bind_by_name($updStmt, ':pw', $data['new_password']);
                oci_bind_by_name($updStmt, ':em', $data['email']);
                oci_execute($updStmt);
                
                // Burn the used OTP
                $burn = oci_parse($conn, "UPDATE AK_OTP_VAULT SET is_used = 1 WHERE user_email = :em");
                oci_bind_by_name($burn, ':em', $data['email']);
                oci_execute($burn);
                
                oci_commit($conn);
                echo json_encode(["success" => true, "message" => "Password Re-Established!"]);
            } else {
                echo json_encode(["success" => false, "message" => "Invalid or Expired OTP Strike."]);
            }
        }
    }
}

oci_close($conn);
?>
