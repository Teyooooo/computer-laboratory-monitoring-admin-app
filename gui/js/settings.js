import { showToast } from "./dom_toggle.js";

let admin_pass

document.addEventListener("DOMContentLoaded", async () => {
  eel.get_settings_from_file()((e) => {
    if(!e) return;

    document.getElementById("db_host").placeholder = e.Host
    document.getElementById("db_user").placeholder = e.User
    document.getElementById("db_pass").placeholder = e.Password
    document.getElementById("db_name").placeholder = e.Database
  });

  admin_pass = await eel.get_admin_password()()
});

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const db_host = document.getElementById("db_host").value.trim();
  const db_user = document.getElementById("db_user").value.trim();
  const db_pass = document.getElementById("db_pass").value.trim();
  const db_name = document.getElementById("db_name").value.trim();

  if (!db_host || !db_user || !db_name) {
    //showToast("Please fill in all fields."); // red-orange text
    showToast("Please fill in all fields.", {
      background: "bg-warning",
      textColor: "text-dark",
    });
    return;
  }

  eel.save_settings_to_file(db_host, db_user, db_pass, db_name)();
  showToast("Settings saved successfully.", {
    background: "bg-success",
    textColor: "text-white",
  });
  sessionStorage.setItem("isConnectedToDB", false);
  sessionStorage.removeItem("shownDBToast");
  // Reset form and dropdowns
  this.reset();
});

document.querySelector('#change_pass').addEventListener('submit', async function(event) {
    event.preventDefault();

    const old_pass = document.getElementById('old_pass').value.trim();
    const new_pass = document.getElementById('new_pass').value.trim();
    const confirm_pass = document.getElementById('confirm_pass').value.trim();
    let isValid = true

    if (!old_pass || !new_pass || !confirm_pass) {
        showToast("Please fill in all fields.", { background: "bg-warning", textColor: "text-dark" });
        return
    }

    if (new_pass !== confirm_pass){
        showToast("New password and confirmation do not match.", { background: "bg-warning", textColor: "text-dark" });
        isValid = false;
    }

    if(new_pass.lenght <= 6){
        showToast("Password must be at least 6 characters long.", { background: "bg-warning", textColor: "text-dark" });
        isValid = false;
    }

    if (old_pass !== admin_pass) {
        showToast("The old password you entered is incorrect.", { background: "bg-warning", textColor: "text-dark" });
        isValid = false;
    }

    if(!isValid) return

    const response = await eel.set_admin_password(new_pass)();
    if(!response){
        showToast("Password change failed. Please try again.", { background: "bg-danger", textColor: "text-white" });
        return
    }
    showToast("Changing Password successfully.", { background: "bg-success", textColor: "text-white" });
    document.querySelector('#change_pass').reset()
});