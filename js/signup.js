let elRegisterForm = document.querySelector(".register-form")

elRegisterForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        newLogin:e.target.login.value,
        newPassword:e.target.password.value,
    }
    e.target[2].innerHTML = `<img src="./images/loading.png" class="mx-auto" width="25" height="25">`
    window.localStorage.setItem("isRegistered", JSON.stringify(data))
    setTimeout(() => {
        e.target[2].innerHTML = "Register"
        location.pathname = "/index.html"
    }, 500)
    e.target.reset() 
})


