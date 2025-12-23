import mysql.connector

# 1. Setup the connection
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",      # Default for XAMPP/WAMP
        password="",      # Default for XAMPP is empty
        database="your_db_name" 
    )

    cursor = db.cursor()

    # 2. Check connection
    if db.is_connected():
        print("Successfully connected to the database!")

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    if 'db' in locals() and db.is_connected():
        cursor.close()
        db.close()