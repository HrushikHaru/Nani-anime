//Selecting all the elements in
const btnMenuImg = document.querySelector(".btn-menu img");
const navSections = document.querySelector(".navigation-sections");
export const loginBtn = document.querySelector(".login");
export const loginWindow = document.querySelector(".login-window");
export const overlay = document.querySelector(".overlay");
const closeLoginModal = document.querySelector(".modal-login-close");
export const signUpBtn = document.querySelector(".signup");
export const registerNewUser = document.querySelector(".register-new-user");
const registrationModalClose = document.querySelector(
  ".modal-registration-close"
);
const signUpBtnInLogin = document.querySelector(".signUp-btn");

//RegisterNewUser elements
const register = document.querySelector(".register-new-user");
export const firstName = document.querySelector(".first-name");
export const lastName = document.querySelector(".last-name");
export const dateOfBirth = document.querySelector(".date-of-birth");
export const age = document.querySelector(".age");
export const registerUserName = document.querySelector(".user-name");
const registerPassword = document.querySelector(".register-password");
export const registerConfirmPassword =
  document.querySelector(".confirm-password");
const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modalClose");
const labelUserName = document.querySelector(".label-username");
const showPassword = document.querySelector(".password-show");
const showPasswordConfirm = document.querySelector(".password-show-confirm");
const validationMessage = document.querySelector(".validation-desc");
export const registerBtn = document.querySelector(".register-btn");
const validationLengtChecker = document.querySelector(
  ".lengthValidationChecker"
);
const header = document.querySelector("header");
const navigation = document.querySelector(".navigation");
export const userFrame = document.querySelector(".user-frame");
export const loginUserName = document.querySelector(".username");
export const loginPassWord = document.querySelector(".password");
const successMessage = document.querySelector(".success-message");

//Navigation
btnMenuImg.addEventListener("click", function () {
  //   if (!navSections.classList.contains("active")) {
  //     navSections.classList.toggle("active");
  //     this.src = "img/close.png";
  //   } else {
  //     navSections.classList.toggle("active");
  //     this.src = "img/menu-button-of-three-horizontal-lines.png";
  //   }

  const img = navSections.classList.contains("active")
    ? "img/menu-button-of-three-horizontal-lines.png"
    : "img/close.png";

  navSections.classList.toggle("active");
  this.src = img;
});

const navigationHeight = navigation.getBoundingClientRect();

const obsCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navigation.classList.add("sticky");
  } else {
    navigation.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `${navigationHeight.height}px`,
});

observer.observe(header);

const showLoginWindow = function () {
  loginWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
  loginWindow.classList.add("fadeIn");
  overlay.classList.add("fadeIn");
};

loginBtn.addEventListener("click", function (e) {
  //Resetting the login page
  loginUserName.value = loginPassWord.value = "";
  successMessage.textContent = "";
  e.preventDefault();
  showLoginWindow();
});

userFrame.addEventListener("click", function () {
  showLoginWindow();
});

closeLoginModal.addEventListener("click", function (e) {
  e.preventDefault();
  loginWindow.classList.add("hidden");
  overlay.classList.add("hidden");
});

signUpBtn.addEventListener("click", function (e) {
  //Resetting the sign-up page
  firstName.value =
    lastName.value =
    dateOfBirth.value =
    age.value =
    registerNewUser.value =
    registerPassword.value =
    registerConfirmPassword.value =
      "";
  e.preventDefault();
  registerNewUser.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

registrationModalClose.addEventListener("click", function (e) {
  e.preventDefault();
  registerNewUser.classList.add("hidden");
  overlay.classList.add("hidden");
});

signUpBtnInLogin.addEventListener("click", function (e) {
  e.preventDefault();
  loginWindow.classList.add("hidden");
  register.classList.remove("hidden");
});

//Validations for filling the form
export const showModalAndOverlay = function (str, value1 = "", value2 = "") {
  validationMessage.textContent = "";
  validationMessage.textContent = str;

  modal.classList.remove("hidden");
  register.style.opacity = 0.9;
  register.style.filter = "blur(2px)";
  // value1.value = "";
};

//These are the values stored for the creation of new object account
let firstNameNew;
let lastNameNew;
let dateOfBirthNew;
let ageNew;
let registerUserNameNew;
let registerPasswordNew;

let yearValue;

//for age calculation
const year = new Date().getFullYear();

//Validaion for month
dateOfBirth.addEventListener("blur", function () {
  const month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  let days;
  let leapYear;
  let monthValue;

  let dayEntry;
  let monthEntry;
  let yearEntry;

  //To check the year entered from the form
  const years = Array.from({ length: 124 }, (_, i) => i + 1900);

  years.forEach((year) => {
    if (dateOfBirth.value.slice(5, 9) === String(year)) {
      yearEntry = true;
      yearValue = year;
      if (year % 4 === 0) {
        leapYear = true;
      }
    }
  });

  //To check the month entered in the form
  month.forEach((mon) => {
    if (dateOfBirth.value.slice(2, 5) === mon) {
      monthValue = mon;
      monthEntry = true;
      if (
        monthValue === "JAN" ||
        monthValue === "MAR" ||
        monthValue === "MAY" ||
        monthValue === "JUL" ||
        monthValue === "AUG" ||
        monthValue === "OCT" ||
        monthValue === "DEC"
      ) {
        days = 31;
      } else if (monthValue === "FEB") {
        if (leapYear) {
          days = 29;
        } else {
          days = 28;
        }
      } else {
        days = 30;
      }
    }
  });

  //To check the day entered from the form
  const day = Array.from({ length: days }, (_, i) => i + 1);

  day.forEach((day) => {
    if (dateOfBirth.value.slice(0, 2) === String(day).padStart(2, "0")) {
      dayEntry = true;
    }
  });

  //implementation of future date violation

  if (dateOfBirth.value.length !== 9) {
    if (validationLengtChecker.classList.contains("date")) {
      validationLengtChecker.classList.remove("hidden");
      validationLengtChecker.textContent =
        "(The date doesn't seem in the right format. Please verify)";
    }

    age.removeAttribute("readonly");
    age.value = "";
    age.setAttribute("readonly", true);
  } else if (dayEntry && monthEntry && yearEntry) {
    //This logic is for age which is
    if (validationLengtChecker.classList.contains("date")) {
      validationLengtChecker.textContent = "";
      validationLengtChecker.classList.add("hidden");
    }

    age.removeAttribute("readonly");
    age.value = year - Number(yearValue);
    ageNew = age.value;
    age.setAttribute("readonly", true);

    //To send the value for new account creation
    dateOfBirthNew = dateOfBirth.value;
    ageNew = ageNew.value;
  } else {
    //error-window
    if (validationLengtChecker.classList.contains("date")) {
      validationLengtChecker.textContent = "";
      validationLengtChecker.classList.add("hidden");
    }

    showModalAndOverlay(
      "Please enter the date according to the specified format, it's not matching the format. Please verify.",
      dateOfBirth
    );

    //For Age
    age.removeAttribute("readonly");
    age.value = "";
    age.setAttribute("readonly", true);
  }
});

//This logic is for when it should suggests the username to the user
let suggestOnce = true;
const domain = "@fam.com";

registerUserName.addEventListener("focus", function () {
  if (suggestOnce) {
    if (age.value > -1 && firstName.value !== "" && lastName !== "") {
      const html = `<span class="username-suggest"> Suggestions - </span>`;
      labelUserName.insertAdjacentHTML("beforeend", html);

      const suggestion1 =
        firstName.value[0].toLowerCase() +
        lastName.value.slice().toLowerCase() +
        domain;

      const randomNumber = Math.trunc(Math.random() * 200) + 1;
      const suggestion2 =
        lastName.value.slice().toLowerCase() + randomNumber + domain;

      const randomNumber2 = Math.trunc(Math.random() * 200) + 1;
      const suggestion3 =
        firstName.value.slice().toLowerCase() + randomNumber2 + domain;

      const suggestions = [suggestion1, suggestion2, suggestion3];

      suggestions.forEach((suggest) => {
        const html = `<span class="username-suggestion"> ${suggest} </span>`;
        labelUserName.insertAdjacentHTML("beforeend", html);
      });

      const usernameSuggestion = document.querySelectorAll(
        ".username-suggestion"
      );

      usernameSuggestion.forEach((suggestName) => {
        suggestName.addEventListener("click", function () {
          registerUserName.value = suggestName.textContent.trim();
        });
      });

      suggestOnce = false;

      //To send the value for new account creation
      firstNameNew = firstName.value;
      lastNameNew = lastName.value;
    } else {
      showModalAndOverlay(
        "Please verify that you have added the First-Name and last-Name field before going any further."
      );
    }
  }
});

//This fireOnce is solution for now find a better one later
// let fireOnce = true;

registerUserName.addEventListener("blur", function () {
  if (
    !(
      registerUserName.value.includes(domain) &&
      registerUserName.value.length >= 12
    )
  ) {
    //show error window
    showModalAndOverlay(
      "Please verify that you have entered the username as designated in the input watermark."
    );
  } else {
    registerUserNameNew = registerUserName.value;
  }
});

registerPassword.addEventListener("blur", function () {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const specialCharacters = [
    "`",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "+",
    "=",
    "[",
    "{",
    "}",
    "]",
    "|",
    ";",
    ":",
    '"',
    "'",
    "<",
    ",",
    ">",
    ".",
    "?",
    "/",
  ];

  let countNumber = 0;
  let specialCharNumber = 0;

  const password = [...registerPassword.value];

  //closures in practice
  password.forEach((el) => {
    numbers.forEach((num) => {
      if (num === Number(el)) {
        countNumber++;
      }
    });

    specialCharacters.forEach((char) => {
      if (char === el) {
        specialCharNumber++;
      }
    });
  });

  if (
    !(
      registerPassword.value.length >= 8 &&
      countNumber >= 1 &&
      specialCharNumber >= 1
    )
  ) {
    //show error window
    showModalAndOverlay(
      "Please enter the password as specified with all the charcters involved in it."
    );
  }
});

registerConfirmPassword.addEventListener("blur", function () {
  if (registerPassword.value === "") {
    showModalAndOverlay(
      "Please enter the password first before confirming the password."
    );
  } else {
    if (!(registerConfirmPassword.value === registerPassword.value)) {
      showModalAndOverlay(
        `The password and the confirmed passwod aren't the same. Please verify.`
      );
    } else {
      //This is for new object creation account
      registerPasswordNew = registerConfirmPassword.value;
    }
  }
});

modalClose.addEventListener("click", function () {
  modal.classList.add("hidden");
  // overlay.classList.add("hidden");
  register.style.opacity = 1;
  register.style.filter = "none";
});

showPassword.addEventListener("click", function () {
  const type =
    registerPassword.getAttribute("type") === "password" ? "text" : "password";
  registerPassword.setAttribute("type", type);
});

showPasswordConfirm.addEventListener("click", function () {
  const type =
    registerConfirmPassword.getAttribute("type") === "password"
      ? "text"
      : "password";
  registerConfirmPassword.setAttribute("type", type);
});

//Jikan API
//Search ANime logic
const searchIconBtn = document.querySelector(".search-icon-anime");
const inputAnime = document.querySelector(".input-anime");
const searchAnime = document.querySelector(".search-anime");
const searchSection = document.querySelector(".search-anime-show");
const searchLink = document.querySelector("#search-link");

// 1.
let animeStr;

searchIconBtn.addEventListener("click", function () {
  animeStr = "";
  animeStr = searchAnime.value;

  // Create the query parameters as a string
  const queryParams = `animeSearch=${animeStr}`;

  // Update the href attribute with the query parameters
  searchLink.href = searchLink.href + "?" + queryParams;

  searchAnime.value = "";
});

const sectionAll = document.querySelectorAll(".section");

navSections.addEventListener("click", function (e) {
  if (e.target.classList.contains("section-nav")) {
    e.target.addEventListener("click", function () {
      const number = e.target.dataset.secselect;
      try {
        // sectionAll[Number(e.target.dataset.secselect)].scrollIntoView({
        //   behavior: "smooth",
        // });
        sectionAll[number].scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.error(err.message);
      }
    });
  }
});

// const rating = async function (rating) {
//   const request = await fetch(
//     `https://api.jikan.moe/v4/anime?q=Naruto&sfw&order_by=${rating}`
//   );
//   const data = await request.json();

//   console.log(data.data[1]);
// };

// rating("mal_id");

// const api = "http://localhost/animes/21";

/////////////FOR POST
// const options = {
//   method: "POST",
//   headers: {
//     "Content-type": "application/json",
//   },
//   body: JSON.stringify({
//     animeName: "Hello2",
//     animeEpisodes: 350,
//     onGoing: false,
//     genres: ["Shonen", "Comedy", "Action"],
//   }),
// };

// const getAnimes = async function (api) {
//   const url = await fetch(api, options);

//   console.log(url.status);
// };

// getAnimes(api);

// console.log("Done");

// const options = {
//   method: "DELETE",
//   headers: {
//     "Content-type": "application/json",
//   },
// };

// const getAnimes = async function (api) {
//   const url = await fetch(api, options);

//   console.log(url.status);
// };

// getAnimes(api);

export function toggleProfileOptions() {
  var options = document.getElementById("profileOptions");
  if (options.style.display === "block") {
    options.style.display = "none";
  } else {
    options.style.display = "block";
  }
}
