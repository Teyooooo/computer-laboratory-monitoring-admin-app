document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Call Python function and parse JSON
        const data_json = await eel.get_student_data()();
        const data = JSON.parse(data_json);

        console.log("Received data:", data);

        const tbody = document.querySelector("#list_of_students tbody");

        // Clear table first
        tbody.innerHTML = "";

        // Loop through data and insert rows
        data.forEach(row => {
            const [uid, name, school_id, gender] = row;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${uid}</td>
                <td>${name}</td>
                <td>${school_id}</td>
                <td>${gender}</td>
            `;
            tbody.appendChild(tr);
        });

        // Initialize DataTable after populating
        new DataTable('#list_of_students');

    } catch (err) {
        showToast("Error: Unable to fetching log history data", {background: "bg-danger", textColor: "text-white" });
        console.error("Error fetching student data:", err);
    }
});

