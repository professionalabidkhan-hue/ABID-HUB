// servermalequrantrainer.js

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ FreeSQLDatabase connection details
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12812633",
  password: "ctUS2wvL2y",
  database: "sql12812633",
  port: 3306
});

// Connect to database
db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to FreeSQLDatabase");
});

// Route for Male Holy Quran Tutor form
app.post("/maleholyqurantable", (req, res) => {
  console.log("📩 Form submission received:", req.body);

  const {
    name, location, skills, languages, rate, type,
    father_name, father_occupation, monthly_income,
    qualification, current_grade, academy_name,
    preferred_timing, study_preference, phone_number, email
  } = req.body;

  // ✅ Complete INSERT statement
  const sql = `
    INSERT INTO maleholyqurantable 
    (name, location, skills, languages, rate, type, father_name, father_occupation, monthly_income, qualification, current_grade, academy_name, preferred_timing, study_preference, phone_number, email) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    name, location, skills, languages, rate, type,
    father_name, father_occupation, monthly_income,
    qualification, current_grade, academy_name,
    preferred_timing, study_preference, phone_number, email
  ], (err) => {
    if (err) {
      console.error("❌ Error saving tutor data:", err);
      return res.status(500).send("❌ Error saving tutor data");
    }
    res.send("✅ Male Holy Quran Tutor registered successfully!");
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
