const form = document.querySelector("form");
const usernameInput = document.querySelector("#usernameLogin");
const passwordInput = document.querySelector("#passwordLogin")

console.log(form, usernameInput, passwordInput)

const logMeIn = event => {
  event.preventDefault()

  const userData = {
    username: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
  }

  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (response.status === 202) {
      window.location.assign("/")
    } else {
      alert("Error logging in")
    }
  })
  .catch(err => console.error(err))
}


form.addEventListener("submit", logMeIn)