document.addEventListener("DOMContentLoaded", () => {
  const logData = JSON.parse(sessionStorage.getItem("log_data"));

  console.log(logData);
  document.getElementById("user").innerHTML = logData[2];
  document.getElementById(
    "user_usage"
  ).innerHTML = `used ${logData[7]} from ${logData[6]} on ${logData[3]}, ${logData[4]} - ${logData[5]}`;
  // document.getElementById("file_content").innerHTML = logData[9];

  const result = logData[9]
    .replace(/<br\s*\/?>/gi, "") // remove <br>, <br/>, <br />
    .trim()
    .split("\n")
    .map((line) => {
      const [datePart, rest] = line.split(" - ");
      const [timePart, app] = rest.split(" : ");

      return {
        date: datePart,
        time: timePart,
        app: app,
      };
    });

  console.log(result);

  for (const used of result) {
    $("#app_used tbody").append(
      `<tr>
                <td>${used.date}</td>
                <td>${used.time}</td>
                <td>${used.app}</td>
            </tr>`
    );
  }

 new DataTable("#app_used", {
  info: false,
  ordering: false,
  paging: false,
  autoWidth: false,

  layout: {
    topStart: () => '<h5 class="dt-title">Application Used:</h5>'
  },

  columnDefs: [
    { width: '15%', targets: [0,1] },
    { width: '80%', targets: 2 },
    { className: "dt-center", targets: [0, 1] }
  ]
});

});

document.getElementById("back").addEventListener("click", () => {
  sessionStorage.removeItem("log_data");
  window.location.href = "./log_history_pc.html";
});
