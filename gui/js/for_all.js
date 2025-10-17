import { showToast } from './dom_toggle.js';

document.addEventListener("DOMContentLoaded", async function () {
    const ip = await eel.get_ip()();
    document.getElementById("ip").innerHTML = "IP Address: " + ip;
    console.log("IP Address: " + ip);

    // const isConnectedToDBjs = sessionStorage.getItem('isConnectedToDB');
    // const alreadyShownToast = sessionStorage.getItem('shownDBToast');

    // console.log("isConnectedToDBjs: " + isConnectedToDBjs);
    // console.log("alreadyShownToast: " + alreadyShownToast);

    // if (isConnectedToDBjs === "true" && !alreadyShownToast) {
    //     showToast("Connected to the database.", {
    //         background: "bg-success",
    //         textColor: "text-white"
    //     });
    //     sessionStorage.setItem('shownDBToast', 'true');
    // } else if (isConnectedToDBjs === "false" || isConnectedToDBjs === null) {
    //     tryingToConnectToDB();
    // }
});

// async function tryingToConnectToDB() {
//     showToast("Trying to connect to the database...", {
//         background: "bg-warning",
//         textColor: "text-dark",
//         delay: 5000
//     });

//     setTimeout(async () => {
//         const isConnectedToDB = await eel.is_connected_to_db()();
//         console.log("isConnectedToDB: " + isConnectedToDB);

//         if (isConnectedToDB === false) {
//             showToast("Error: Unable to connect to the database.", {
//                 background: "bg-danger",
//                 textColor: "text-white"
//             });
//         } else {
//             showToast("Connected to the database.", {
//                 background: "bg-success",
//                 textColor: "text-white"
//             });
//         }

//         // Store string version ("true"/"false") to sessionStorage
//         sessionStorage.setItem('isConnectedToDB', String(isConnectedToDB));
//     }, 5000);
// }


eel.expose(showToastFromJS);
function showToastFromJS(message, options) {
    if(options === "success") {
        showToast(message, {
                background: "bg-success",
                textColor: "text-white"
            });
    }else if(options === "warning") {
        showToast(message, {
                background: "bg-warning",
                textColor: "text-dark"
            });
    }else if(options === "danger") {
        showToast(message, {
                background: "bg-danger",
                textColor: "text-white"
            });
    }
}


eel.expose(triggerToastEvent);
function triggerToastEvent(status) {
    const isItShown = sessionStorage.getItem("toastShownDB")

  if (status === "connected" && isItShown) {
    showToastFromJS("Connected to the database.", "success");
    sessionStorage.setItem("toastShownDB", true)
  } else if (status === "disconnected") {
    showToastFromJS("Database connection lost.", "danger");
    sessionStorage.setItem("toastShownDB", false)
  }
}