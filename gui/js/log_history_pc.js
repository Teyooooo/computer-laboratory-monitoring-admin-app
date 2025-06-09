import { showToast } from './dom_toggle.js';

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Call Python function and parse JSON
        const data_json = await eel.get_logs_pc()();
        const data = JSON.parse(data_json);

        console.log("Received data:", data);

        const tbody = document.querySelector("#log_history_pc tbody");

        // Clear table first
        tbody.innerHTML = "";

        // Loop through data and insert rows
        data.forEach(row => {
            // id, date, time_in, time_out, pc_name, uid, student_id, name, gender, file_name, file_content
            const [id, date, time_in, time_out, pc_name, uid, student_id, name, gender, file_name, file_content] = row;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${date}</td>
                <td>${time_in}</td>
                <td>${time_out}</td>
                <td>${student_id}</td>
                <td>${name}</td>
                <td>${pc_name}</td>
                <td><button class="btn btn-success w-100 h-80">View</button></td>
            `;
            tbody.appendChild(tr);

            const viewLink = tr.querySelector('button');
            viewLink.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.setItem('log_data', JSON.stringify(row));
                window.location.href = "../view_activity.html";
            });
        });

        // Initialize DataTable after populating
        new DataTable('#log_history_pc');

    } catch (err) {
        showToast("Error: Unable to fetching log history data", {background: "bg-danger", textColor: "text-white" });
        console.error("Error fetching student data:", err);
    }
});

