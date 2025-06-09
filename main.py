import eel
import threading

import logic.connect_device
import logic.edit_settings
import logic.connect_db
import logic.get_data_registered 
import logic.get_data_logs
import logic.register_edit_users
import logic.get_ip


eel.init('gui', allowed_extensions=['.js', '.html'])

# Start UID polling in a thread
threading.Thread(target=logic.connect_device.get_uid, daemon=True).start()

try:
    print("Trying to start Eel with Chrome")
    eel.start('index.html', mode='chrome')  # Explicitly use 'chrome' mode
    
except Exception as e:
    print("Failed to start with Chrome:", e)
    print("Starting Eel with default browser")
    eel.start('index.html', mode='default')
