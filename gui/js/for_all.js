import { showToast } from "./dom_toggle.js";

document.addEventListener("DOMContentLoaded", async function () {
  const ip = await eel.get_ip()();
  document.getElementById("ip").innerHTML = "IP Address: " + ip;
  console.log("IP Address: " + ip);
});

document.querySelector("#btn_door_api").addEventListener("click", () => {
  showToastFromJS("Executing Door API.", "success")
  eel.run_door_api()();
});

eel.expose(showToastFromJS);
function showToastFromJS(message, options) {
  if (options === "success") {
    showToast(message, {
      background: "bg-success",
      textColor: "text-white",
    });
  } else if (options === "warning") {
    showToast(message, {
      background: "bg-warning",
      textColor: "text-dark",
    });
  } else if (options === "danger") {
    showToast(message, {
      background: "bg-danger",
      textColor: "text-white",
    });
  }
}

// eel.expose(clearDBToastLocalStorage);
// function clearDBToastLocalStorage(){
//   console.debug("clearing local storage toast db")
//   localStorage.removeItem("connectedToastShownDB")
//   localStorage.removeItem("disconnectedToastShownDB")
// }

eel.expose(triggerToastEvent);
function triggerToastEvent(status) {
  const connectedIsItShown = sessionStorage.getItem("connectedToastShownDB");
  const disconnectedIsItShown = sessionStorage.getItem("disconnectedToastShownDB");

  console.log(connectedIsItShown)
  console.log(disconnectedIsItShown)

  if (status === "connected" && (connectedIsItShown !== "true")) {
    console.log(status)
    showToastFromJS("Connected to the database.", "success");
    sessionStorage.setItem("connectedToastShownDB", "true");
    sessionStorage.setItem("disconnectedToastShownDB", "false");
  } else if (status === "disconnected" && (disconnectedIsItShown !== "true")) {
    console.log(status)
    showToastFromJS("Database connection lost.", "danger");
    sessionStorage.setItem("connectedToastShownDB", "false");
    sessionStorage.setItem("disconnectedToastShownDB", "true");
  }
}