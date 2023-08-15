import {
  loginBtn,
  signUpBtn,
  firstName,
  lastName,
  dateOfBirth,
  age,
  registerUserName,
  registerConfirmPassword,
  showModalAndOverlay,
  registerNewUser,
  overlay,
  loginWindow,
  userFrame,
  toggleProfileOptions,
  loginUserName,
  loginPassWord,
} from "./script.js";

const signUp = document.getElementById("sign-up");
const loginForm = document.querySelector("#login");
const loginButton = document.querySelector(".login-btn");
const headerHero = document.querySelector(".header-hero");
const navigationSection = document.querySelector(".navigation-sections");
const userProfileDesc = document.querySelector(".user-profile");
const errorMessage = document.querySelector(".err-message");
const successMessage = document.querySelector(".success-message");

//Special case
const logoutBtn = document.querySelector(".logout-link");

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

        localStorage.setItem("token", token);

        localStorage.setItem("name", response.firstName);

        localStorage.setItem("userId", response.userId);

        checkIfLoggedIn();

        successMessage.textContent = "Login Successful!";

        setTimeout(() => {
          loginWindow.classList.add("hidden");
          overlay.classList.add("hidden");
          //location.reload();
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
    console.error(e.message);
  }
});

signUp.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    firstName.value == "" ||
    lastName.value == "" ||
    age.value == "" ||
    dateOfBirth.value == "" ||
    registerUserName.value == "" ||
    registerConfirmPassword.value == ""
  ) {
    showModalAndOverlay("Please fill the details before submitting");
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: dateOfBirth.value,
        age: age.value,
        userName: registerUserName.value,
        passWord: registerConfirmPassword.value,
      }),
    };

    try {
      const signIn = async function () {
        const request = await fetch("http://localhost/signup", options);

        if (request.status === 201) {
          //To erase the value
          firstName.value =
            lastName.value =
            dateOfBirth.value =
            age.value =
            registerUserName.value =
            registerConfirmPassword.value =
              "";

          loginBtn.style.display = "none";
          signUpBtn.style.display = "none";

          registerNewUser.classList.add("hidden");
          overlay.classList.add("hidden");

          window.location.href = "verify-new-user.html";
          // HTMLFormElement.prototype.submit.call(signUp);
        } else {
          showModalAndOverlay(`Error code ${request.status}`);
        }
      };

      signIn();
    } catch (e) {
      console.error(e.message);
    }
  }
});

// const fetchUsers = async function () {
//   const response = await fetch("http://localhost/users", {
//     method: "GET",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   const data = await response.json();

//   console.log(data);
// };

// fetchUsers();

const checkIfLoggedIn = function () {
  if (localStorage.getItem("token") != null) {
    loginBtn.style.display = "none";
    signUpBtn.style.display = "none";

    // const html = `<p id="username">Welcome ${localStorage.getItem(
    //   "name"
    // )}!</p>`;

    // headerHero.insertAdjacentHTML("afterbegin", html);

    userFrame.style.display = "none";

    userProfileDesc.classList.remove("hidden");
  }
};

//location.reload()

checkIfLoggedIn();

const processAfterLogOut = function () {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("name");

  userProfileDesc.classList.add("hidden");

  userFrame.style.display = "block";

  loginBtn.style.display = "block";
  signUpBtn.style.display = "block";
};

logoutBtn.addEventListener("click", function () {
  processAfterLogOut();
});
