import { showToast } from './dom_toggle.js';

document.addEventListener("DOMContentLoaded", async ()=>{
    const password = await eel.get_admin_password()()
    // console.log(password)

    if(!password){
        showToast("Failed to Connect to Database", {
                background: "bg-danger", 
                textColor: "text-white",
                delay: 10000
            })
    }

    document.querySelector("#login_btn").addEventListener("click", function(event){
        event.preventDefault()
        const input = document.querySelector("#admin_pass")
        const entered_pass =  input.value.trim()
        console.log({entered_pass})
        if(password === entered_pass){
            sessionStorage.setItem("isLogin", true)
            window.location.href = "./index.html"
        }else{
            input.value = ""
            showToast("Wrong Password!", {
                background: "bg-danger", 
                textColor: "text-white"
            })
        }
    })
})