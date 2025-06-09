import { showToast } from './dom_toggle.js';

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const db_host = document.getElementById('db_host').value.trim();
    const db_user = document.getElementById('db_user').value.trim();
    const db_pass = document.getElementById('db_pass').value.trim();
    const db_name = document.getElementById('db_name').value.trim();


    if (!db_host || !db_user || !db_name) {
        //showToast("Please fill in all fields."); // red-orange text
        showToast("Please fill in all fields.", { background: "bg-warning", textColor: "text-dark" });
        return;
    }

    eel.save_settings_to_file(db_host, db_user, db_pass, db_name)();
    showToast("Settings saved successfully.", { background: "bg-success", textColor: "text-white" });
    sessionStorage.setItem('isConnectedToDB', false);
    sessionStorage.removeItem('shownDBToast');
    // Reset form and dropdowns
    this.reset();
});
