# Script to fix the corrupted section in fastapi_server.py
with open('backend/fastapi_server.py', 'r') as f:
    lines = f.readlines()

# Remove the corrupted lines (973 to 994)
fixed_lines = lines[:973] + lines[994:]

with open('backend/fastapi_server.py', 'w') as f:
    f.writelines(fixed_lines)

print("File fixed successfully!")