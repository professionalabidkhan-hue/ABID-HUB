const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. CONNECTION TO YOUR FREESQLDATABASE
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com', 
    user: 'your_db_username',    // REPLACE WITH YOUR ACTUAL DB USER
    password: 'your_db_password', // REPLACE WITH YOUR ACTUAL DB PASS
    database: 'your_db_name'      // REPLACE WITH YOUR ACTUAL DB NAME
});

db.connect(err => {
    if (err) {
        console.error('Master Hub Database Connection Failed: ' + err.stack);
        return;
    }
    console.log('Connected to Abid Khan Hub Database.');
});

// --- NEW: SECURE FOUNDER LOGIN (Protects your honor) ---
app.post('/api/founder-login', (req, res) => {
    const { key } = req.body;
    // THIS IS THE ONLY PLACE THE PASSWORD EXISTS
    const MASTER_SECRET = "ABID786"; 

    if (key === MASTER_SECRET) {
        res.json({ 
            success: true, 
            token: "ABID_HUB_SECURE_ACCESS_99" // This token unlocks the dashboard
        });
    } else {
        console.log("ALERT: Unauthorized attempt to enter Founder Panel!");
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
});

// --- NEW: LIVE ANALYTICS FOR DASHBOARD ---
app.get('/api/master-stats', (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM itstudenttable) as it_students,
            (SELECT COUNT(*) FROM maleholyqurantable) as quran_students,
            (SELECT COUNT(*) FROM hubtrainertable) + (SELECT COUNT(*) FROM islamictrainertable) as total_trainers
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        
        const stats = results[0];
        const total = stats.it_students + stats.quran_students + stats.total_trainers;
        
        res.json({
            success: true,
            total_active: total,
            it_students: stats.it_students,
            quran_students: stats.quran_students,
            total_trainers: stats.total_trainers
        });
    });
});

// 2. MASTER SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
    const { 
        full_name, email, password, phone_number, 
        father_name, monthly_income, preferred_timing, 
        location, field, role 
    } = req.body;

    let targetTable = "";
    if (role === 'learn') {
        targetTable = (field === 'IT') ? "itstudenttable" : "maleholyqurantable";
    } else if (role === 'teach') {
        targetTable = (field === 'IT') ? "hubtrainertable" : "islamictrainertable";
    }

    let sql = "";
    let params = [];

    if (targetTable === "itstudenttable") {
        sql = `INSERT INTO itstudenttable (full_name, email, password, status) VALUES (?, ?, ?, ?)`;
        params = [full_name, email, password, 'Active'];
    } else {
        sql = `INSERT INTO ${targetTable} 
               (name, email, password, phone_number, father_name, monthly_income, preferred_timing, location, type) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        params = [full_name, email, password, phone_number, father_name, monthly_income, preferred_timing, location, field];
    }

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: err.code });
        res.json({ success: true, message: `Account created in ${targetTable}` });
    });
});

// 3. MASTER LOGIN ROUTE
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `
        SELECT full_name, role, field FROM (
            SELECT full_name, 'learn' as role, 'IT' as field, email, password FROM itstudenttable
            UNION
            SELECT name as full_name, 'learn' as role, 'Islamic' as field, email, password FROM maleholyqurantable
            UNION
            SELECT name as full_name, 'teach' as role, 'Islamic' as field, email, password FROM islamictrainertable
            UNION
            SELECT full_name, 'teach' as role, 'IT' as field, email, password FROM hubtrainertable
        ) AS all_users WHERE email = ? AND password = ?`;

    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ success: false });
        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    });
});

app.listen(5000, () => console.log('Abid Khan Hub Master Server running on Port 5000'));