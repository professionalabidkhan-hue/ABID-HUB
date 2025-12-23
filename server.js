// server.js

// 1. Import required modules
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

// 2. Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3. **Database connection** ← Paste it here
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",   // Your FreeSQLDatabase host
  user: "sql12812633",                 // Your DB username
  password: "ctUS2wvL2y",              // Your DB password
  database: "sql12812633"              // Your DB name
});

// 4. Connect to database
db.connect(err => {
  if(err) throw err;
  console.log("Connected to database.");
});

// 5. Define your routes (example: tutor signup)
app.post("/signup-tutor", (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO tutors
    (name, location, skills, languages, rate, type, father_name, father_occupation, monthly_income, qualification, current_grade, academy_name, preferred_timing, study_preference, phone_number, email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    data.name, data.location, data.skills, data.languages, data.rate, data.type,
    data.father_name, data.father_occupation, data.monthly_income, data.qualification,
    data.current_grade, data.academy_name, data.preferred_timing, data.study_preference,
    data.phone_number, data.email
  ];

  db.query(sql, values, (err, result) => {
    if(err) return res.status(500).send(err);
    res.json({ success: true, tutorId: result.insertId });
  });
});

// 6. Start server
app.listen(3000, () => console.log("Server running on port 3000"));
