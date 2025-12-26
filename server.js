// --- 1. GENERATE & SEND OTP ---
app.post('/api/send-otp', async (req, res) => {
    let connection;
    try {
        const { phone } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
        
        connection = await oracledb.getConnection(dbConfig);
        
        // Save OTP to User Record (Valid for 10 minutes)
        await connection.execute(
            `UPDATE AK_USERS SET otp_code = :otp, otp_expiry = (CURRENT_TIMESTAMP + INTERVAL '10' MINUTE) 
             WHERE whatsapp_no = :phone`,
            [otp, phone],
            { autoCommit: true }
        );

        console.log(`[SECURITY] OTP for ${phone}: ${otp}`); // In production, you'd send this via SMS API
        res.json({ success: true, message: "Verification code sent to your Hub Number!" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    } finally {
        if (connection) await connection.close();
    }
});

// --- 2. VERIFY & RESET PASSWORD ---
app.post('/api/reset-password', async (req, res) => {
    let connection;
    try {
        const { phone, otp, newPassword } = req.body;
        connection = await oracledb.getConnection(dbConfig);

        // Check if OTP is valid and not expired
        const result = await connection.execute(
            `SELECT * FROM AK_USERS WHERE whatsapp_no = :phone AND otp_code = :otp AND otp_expiry > CURRENT_TIMESTAMP`,
            [phone, otp]
        );

        if (result.rows.length > 0) {
            const hashedPass = await bcrypt.hash(newPassword, 10);
            await connection.execute(
                `UPDATE AK_USERS SET password = :pass, otp_code = NULL WHERE whatsapp_no = :phone`,
                [hashedPass, phone],
                { autoCommit: true }
            );
            res.json({ success: true, message: "Identity Verified. Password Reset Complete!" });
        } else {
            res.status(400).json({ success: false, message: "Invalid or Expired Code." });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    } finally {
        if (connection) await connection.close();
    }
});