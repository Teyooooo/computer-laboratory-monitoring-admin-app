import { showToast } from "./dom_toggle.js";

function updateDropdownPlaceholder(buttonId, value) {
  document.getElementById(buttonId).textContent = value;
  if (buttonId === "roleDropdown") {
    document.getElementById("role").value = value;
  } else if (buttonId === "genderDropdown") {
    document.getElementById("gender").value = value;
  }
}

// Make available to inline event handlers
window.updateDropdownPlaceholder = updateDropdownPlaceholder;

document
  .querySelector("#register_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const uid = document.getElementById("uid").value;
    const name = document.getElementById("name").value.trim();
    const schoolId = document.getElementById("school_id").value.trim();
    const role = document.getElementById("role").value;
    const gender = document.getElementById("gender").value;

    if (!name || !schoolId || !role || !gender) {
      //showToast("Please fill in all fields."); // red-orange text
      showToast("Please fill in all fields.", {
        background: "bg-warning",
        textColor: "text-dark",
      });
      return;
    }

    console.log("UID:", uid);
    console.log("Name:", name);
    console.log("School ID:", schoolId);
    console.log("Role:", role);
    console.log("Gender:", gender);

    const btn_name = document.getElementById("register_btn").textContent;

    if (btn_name === "Set") {
      eel.add_user(
        uid,
        name,
        schoolId,
        role,
        gender
      )((response) => {
        let type = "success";
        if (response.status.toLowerCase() === "failed") {
          type = "danger";
        }
        showToast(response.message, {
          background: `bg-${type}`,
          textColor: "text-white",
        });
      });
    } else if (btn_name === "Update") {
      eel.delete_user(schoolId)();
      eel.add_user(
        uid,
        name,
        schoolId,
        role,
        gender
      )((response) => {
        let type = "success";
        if (response.status.toLowerCase() === "failed") {
          type = "danger";
        }
        showToast(response.message, {
          background: `bg-${type}`,
          textColor: "text-white",
        });
      });
      document.getElementById("register_btn").textContent = "Set";
    }

    // eel.ready_rescan()();
    // Reset form and dropdowns
    this.reset();
    document.getElementById("roleDropdown").textContent = "Select Role";
    document.getElementById("genderDropdown").textContent = "Select Gender";
    document.getElementById("role").value = "";
    document.getElementById("gender").value = "";
  });

document
  .querySelector("#edit_delete_form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const searched_user = document.getElementById("search_user").value.trim();

    if (!searched_user) {
      //showToast("Please fill in all fields."); // red-orange text
      showToast("Please fill in all fields.", {
        background: "bg-warning",
        textColor: "text-dark",
      });
      return;
    }

    const result = await eel.get_search_user(searched_user)();

    if (!result) {
      // Python returned None (null in JS)
      showToast("User not found.", {
        background: "bg-danger",
        textColor: "text-white",
      });
      return;
    }

    const cred = JSON.parse(result);

    if (cred.length === 0) {
      // User not found in DB
      showToast("User not found.", {
        background: "bg-danger",
        textColor: "text-white",
      });
      return;
    }

    const user = cred[0]; // Take the first user

    document.querySelector("#edit_delete_result").innerHTML = `
        <p class="fw-bold">Search Result:</p>
        <hr>
        <div class="fw-bold ms-3">
            Name: ${user.name}<br>
            UID: ${user.uid}<br>
            School ID: ${user.school_id}<br>
            Role: ${user.role}<br>
            Gender: ${user.gender}<br>
        </div>
        <hr>
        <div class="d-flex gap-4 mt-4 justify-content-center">
            <button type="button" class="btn btn-danger" id="delete_user_btn" data-school-id=${user.school_id}>Delete</button>
            <button type="button" class="btn btn-primary" id="edit_user_btn">Edit</button>
            <button type="button" class="btn btn-secondary" id="cancel_btn">Cancel</button>
        </div>
    `;

    document
      .querySelector("#delete_user_btn")
      .addEventListener("click", function () {
        const schoolId = this.getAttribute("data-school-id");
        console.debug("Attempting to delete user with School ID:", schoolId);
        // Store schoolId for use in confirmDeleteBtn handler if needed
        document
          .getElementById("confirmDeleteBtn")
          .setAttribute("data-school-id", schoolId);
        const modal = new bootstrap.Modal(
          document.getElementById("loading-modal")
        );
        modal.show();
      });

    document
      .getElementById("confirmDeleteBtn")
      .addEventListener("click", async function () {
        // Perform delete action here, e.g. API call or DOM update
        console.log("User deletion confirmed");
        const schoolId = this.getAttribute("data-school-id");

        // Optionally close the modal after confirmation
        bootstrap.Modal.getInstance(
          document.getElementById("loading-modal")
        ).hide();

        console.debug("Attempting to delete user with School ID:", schoolId); // this is the problem
        const isSuccess = await eel.delete_user(schoolId)();
        console.debug("Deletion success status:", isSuccess); // not returning anything
        if (!isSuccess) {
          showToast("Failed to delete user.", {
            background: "bg-danger",
            textColor: "text-white",
          });
          return;
        } else {
          showToast("User deleted successfully.", {
            background: "bg-success",
            textColor: "text-white",
          });
          clear_search_result();
          return;
        }
      });

    document
      .querySelector("#edit_user_btn")
      .addEventListener("click", function () {
        edit_user(user);
        clear_search_result();
        eel.not_ready_rescan()();
      });

    document
      .querySelector("#cancel_btn")
      .addEventListener("click", function () {
        clear_search_result();
      });
  });

document
  .querySelector("#search_user")
  .addEventListener("input", function (event) {
    const value = event.target.value;

    if (value.length === 0) {
      clear_search_result();
      return;
    }
  });

function edit_user(data) {
  document.getElementById("uid").value = data.uid;
  document.getElementById("name").value = data.name;
  document.getElementById("school_id").value = data.school_id;
  document.getElementById("roleDropdown").textContent = data.role;
  document.getElementById("genderDropdown").textContent = data.gender;
  document.getElementById("role").value = data.role;
  document.getElementById("gender").value = data.gender;
  document.getElementById("register_btn").textContent = "Update";
}

function clear_search_result() {
  document.querySelector("#edit_delete_result").innerHTML = "";
  document.getElementById("search_user").value = "";
}
eel.expose(receive_uid);
function receive_uid(uid) {
  if (uid === "registered") {
    showToast("UID is already registered.", {
      background: "bg-warning",
      textColor: "text-dark",
    });
    return;
  }

  console.log("Received UID:", uid);
  document.getElementById("uid").value = uid;
}

eel.expose(isDeviceConnected);
function isDeviceConnected(is_it_connected) {
  if (is_it_connected === null) {
    showToast("Device not found. Waiting for 5 seconds...", {
      background: "bg-warning",
      textColor: "text-dark",
    });
    return;
  }

  if (!is_it_connected) {
    showToast("Device disconnected.", {
      background: "bg-danger",
      textColor: "text-white",
    });
    return;
  }
  showToast("Device connected.", {
    background: "bg-success",
    textColor: "text-white",
  });
}
