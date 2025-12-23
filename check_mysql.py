import mysql.connector

try:
    print("MySQL Connector version:", mysql.connector.__version__)
    print("Success! You are ready to build your database app.")
except Exception as e:
    print("Error:", e)