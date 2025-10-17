import eel
import threading
import socket

import logic.connect_device
import logic.edit_settings
import logic.connect_db
import logic.get_data_registered 
import logic.get_data_logs
import logic.register_edit_users
import logic.get_ip

def find_available_port(start_port, max_port=8100):
    for port in range(start_port, max_port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('localhost', port)) != 0:
                return port  # port is available
    raise RuntimeError("No available ports found in range.")

eel.init('gui', allowed_extensions=['.js', '.html'])

# Start UID polling in a thread
threading.Thread(target=logic.connect_device.get_uid, daemon=True).start()
threading.Thread(target=logic.connect_db.checkIfConnected, daemon=True).start()

try:
    port = find_available_port(8000)  # Start looking from port 8000
    print(f"Starting Eel on port {port}")
    try:
        eel.start('index.html', mode='chrome', size=(1800, 1500), port=port)
    except Exception as e:
        print("Failed to start with Chrome:", e)
        print("Starting with default browser")
        eel.start('index.html', mode='default', size=(1800, 1500), port=port)

except Exception as e:
    print("Failed to start Eel:", e)
