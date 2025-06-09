document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Call Python function and parse JSON
        const data_json = await eel.get_logs_room()();
        const data = JSON.parse(data_json);

        console.log("Received data:", data);

        const tbody = document.querySelector("#log_history_room tbody");

        // Clear table first
        tbody.innerHTML = "";

        // Loop through data and insert rows
        data.forEach(row => {
            const [id, name, date, time_in, time_out, room_name, school_id] = row;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${name}</td>
                <td>${date}</td>
                <td>${time_in}</td>
                <td>${time_out}</td>
                <td>${room_name}</td>
                <td>${school_id}</td>
            `;
            tbody.appendChild(tr);
        });

        // Initialize DataTable after populating
        new DataTable('#log_history_room');

    } catch (err) {
        showToast("Error: Unable to fetching log history data", {background: "bg-danger", textColor: "text-white" });
        console.error("Error fetching student data:", err);
    }
});