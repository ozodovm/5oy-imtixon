let elLoginForm = document.querySelector(".login-form")

elLoginForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
       login:e.target.login.value, 
       password:e.target.password.value, 
    }
    e.target.reset()
    const isRegistered = JSON.parse(window.localStorage.getItem("isRegistered"))
    if (isRegistered) {
        if (data.login.trim().toLowerCase() == isRegistered.newLogin.toLowerCase() && data.password.trim().toLowerCase() == isRegistered.newPassword.toLowerCase()) {
            window.localStorage.setItem("loginedUser", JSON.stringify(data))
            location.pathname = "/student.html"
        } 
    }   
    else {
        if (data.login.trim().toLowerCase() == "nurillo" && data.password.trim().toLowerCase() == "123") {
            e.target[2].innerHTML = `<img src="./images/loading.png" class="mx-auto" width="25" height="25">`
            window.localStorage.setItem("loginedUser", JSON.stringify(data))
            setTimeout(() => {
                location.pathname = "/student.html"
            }, 1000)
        }
        else {
            alert("User is not defined")
        }
    }
})
