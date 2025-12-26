const oracledb = require('oracledb');

const dbConfig = {
  user: "PROFESSIONALABIDK_SCHEMA_HGQOS",
  password: "<CURRENT_PASSWORD>", // Keep this secure!
  connectString: "db.freesql.com:1521/23ai_34ui2"
};

// --- NEW FUNCTION TO FETCH STUDENTS ---
async function getHubStudents() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    // Fetching from your custom AK_ table
    const result = await connection.execute(
      `SELECT student_id, full_name, email, major_track 
       FROM AK_STUDENTS 
       ORDER BY enrollment_date DESC`,
      [], // Bind variables (none needed here)
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // This makes results easy to use in HTML
    );

    console.log('Successfully retrieved students:', result.rows.length);
    return result.rows; 

  } catch (err) {
    console.error("Database Error:", err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// --- UPDATED EXECUTION ---
async function run() {
  console.log('Starting Abid Khan E-Learning Hub Engine...');
  const students = await getHubStudents();
  console.log(students);
}

run();