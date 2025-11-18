import sqlite3
import os

# Connect to the email database
db_path = "email_data.db"

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    print("Tables in the database:")
    for table in tables:
        print(f"  - {table[0]}")
        
    # Check if admin_credentials table exists
    cursor.execute("PRAGMA table_info(admin_credentials)")
    columns = cursor.fetchall()
    
    if columns:
        print("\nadmin_credentials table structure:")
        for column in columns:
            print(f"  - {column[1]} ({column[2]})")
    else:
        print("\nadmin_credentials table does not exist")
        
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")