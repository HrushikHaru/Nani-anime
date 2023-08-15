const loginForm = document.querySelector(".login-form");
const loginUserName = document.querySelector(".username");
const loginPassWord = document.querySelector(".password");
const errorMessage = document.querySelector(".error-message");
const successMessage = document.querySelector(".success-message");

loginUserName.addEventListener("focus", function () {
  errorMessage.textContent = "";
});

loginPassWord.addEventListener("focus", function () {
  errorMessage.textContent = "";
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Basic " + btoa(`${loginUserName.value}:${loginPassWord.value}`),
    },
  };

  try {
    const login = async function () {
      const request = await fetch("http://localhost/signin", options);

      if (request.status === 202) {
        const response = await request.json();

        const token = response.token;
        // const username = response.username;

        localStorage.setItem("token", token);

        // localStorage.setItem("username", username);

        localStorage.setItem("name", response.firstName);

        localStorage.setItem("userId", response.userId);

        successMessage.textContent = "Login Successful";

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);

        //loginForm.submit();
      } else if (request.status === 401) {
        errorMessage.textContent =
          "Wrong Credentials! Please verify your username and password.";
      } else if (request.status === 500) {
        errorMessage.textContent =
          "Sorry the server is down right now! Try again after some-time.";
      }
    };

    login();
  } catch (e) {
    console.error(e);
  }
});
