const form = document.querySelector(".form");
const userProfile = document.querySelector(".user-profile");
const watchList = document.querySelector(".watch-list");
const passwordBtn = document.querySelector(".password-button");
const passwordForm = document.getElementById("password-form");
const updateForm = document.querySelector(".update-form");
const watchListLayout = document.querySelector(".watchList");

//Updation Form Elements
const updateFirstName = document.querySelector(".first-Name");
const updateLastName = document.querySelector(".last-Name");
const updateUserName = document.querySelector(".user-name");
const updatePassWordCheck = document.querySelector(".password");
const updatePassWord = document.querySelector(".confirm-password");
const modalClose = document.querySelector(".modalClose");
const modal = document.querySelector(".modal");
const validation = document.querySelector(".validation");
const validationMessage = document.querySelector(".validation-desc");
const overlay = document.querySelector(".overlay");
const errorImg = document.querySelector(".error-img");

//WatchList elements
const searchedAnime = document.querySelector(".search-anime");
const searchIcon = document.querySelector(".search-icon-anime");
const searchResults = document.querySelector(".search-results");
const errorMessage = document.querySelector(".search-anime-show h2");
const showError = document.querySelector(".show-error p");
const preLoader = document.querySelector(".pre-loader");

const searchAnime = document.querySelector(".search-anime");
const searchIconBtn = document.querySelector(".search-icon-anime");
const searchSection = document.querySelector(".search-anime-show");
const searchSection2 = document.querySelector(".btn-search");
const inputAnime = document.querySelector(".input-anime");
const pagination = document.querySelector(".pagination");
const navigation = document.querySelector(".navigation");

userProfile.addEventListener("click", function () {
  watchListLayout.style.display = "none";
  form.style.display = "block";
});

watchList.addEventListener("click", function () {
  form.style.display = "none";
  watchListLayout.style.display = "block";
});

passwordBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (passwordForm.style.display === "none") {
    updatePassWord.value = updatePassWordCheck.value = "";
    passwordForm.style.display = "block";
  } else {
    passwordForm.style.display = "none";
  }
});

const updateUserDetailsInForm = async function () {
  try {
    const response = await fetch(
      `http://localhost:8080/users/${localStorage.getItem("userId")}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    //Updating the user profile with user's data
    updateFirstName.value = data.firstName;
    updateLastName.value = data.lastName;
    updateUserName.value = data.userName;
  } catch (e) {
    console.error(e.message);
  }
};

updateUserDetailsInForm();

//Validations//
const showModalAndOverlay = function (
  str,
  valid = "Validation Error",
  error = "keep",
  modalCloseBtn = ""
) {
  validationMessage.textContent = "";
  validationMessage.textContent = str;

  validation.textContent = "";
  validation.textContent = valid;

  if (error === "remove") {
    errorImg.remove();
  }

  if (modalCloseBtn === "remove") {
    modalClose.remove();
  }

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

modalClose.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

const domain = "@fam.com";
updateFirstName.addEventListener("blur", function () {
  if (updateFirstName.value === "") {
    showModalAndOverlay("Please fill the first-name field to update.");
  }
});

updateLastName.addEventListener("blur", function () {
  if (updateLastName.value === "") {
    showModalAndOverlay("Please fill the last-name field to update.");
  }
});

updateUserName.addEventListener("blur", function () {
  if (
    !(
      updateUserName.value.includes(domain) && updateUserName.value.length >= 12
    )
  ) {
    //show error window
    showModalAndOverlay(
      "Please verify that you have entered the username as designated in the input watermark."
    );
  }
});

updatePassWord.addEventListener("blur", function () {
  if (updatePassWordCheck.value === "") {
    showModalAndOverlay(
      "Please enter the password first before confirming the password."
    );
  } else {
    if (updatePassWordCheck.value !== updatePassWord.value) {
      showModalAndOverlay(
        `The password and the confirmed passwod aren't the same. Please verify.`
      );
    }
  }
});

//Update the user's details
updateForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const updateInfo = async function () {
    try {
      const response = await fetch(`http://localhost:8080/users`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: Number(localStorage.getItem("userId")),
          firstName: updateFirstName.value,
          lastName: updateLastName.value,
          userName: updateUserName.value,
          password: updatePassWord.value,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        //updateForm.submit();
        showModalAndOverlay(
          "The Changes are made according to the prescribed way.",
          data.response,
          "remove"
        );
      } else {
        showModalAndOverlay(
          "There was some error while updating the profile.",
          data.response
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateInfo();
});

//Get WatchList from MySQL
const getWatchList = async function () {
  try {
    preLoader.classList.add("show");
    const response = await fetch(
      `http://localhost:8080/watchList/${localStorage.getItem("userId")}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (data.malId.length === 0) {
      const html = `<a href="search-anime.html" class="click-to-add">Click Here to add anime's to watchlist</a>`;

      searchResults.insertAdjacentHTML("beforebegin", html);
      throw new Error("No Anime has added to the WatchList yet.");
    }

    const delay = 1000 / 3; // Delay in milliseconds (3 requests per second)

    pagination.innerHTML = "";
    searchResults.innerHTML = "";
    showError.textContent = "";
    pagination.innerHTML = "";

    for (const el of data.malId) {
      await new Promise((resolve) => setTimeout(resolve, delay)); // Delay before each request

      const response = await fetch(`https://api.jikan.moe/v4/anime/${el}`);
      const animeData = await response.json();

      preLoader.classList.remove("show");
      fillTheSearchData(animeData.data);
    }

    const animesToDelete = searchResults.querySelectorAll(".removeFromWL");

    animesToDelete.forEach((button) => {
      button.addEventListener("click", deleteAnimeFromWL);
    });
  } catch (e) {
    console.error(e);
    preLoader.classList.remove("show");
    showError.textContent = e.message;
  }
};

getWatchList();

//For watchList
const fillTheSearchData = function (anime) {
  const html = `<div>
                  <a href="anime.html?animeId=${anime.mal_id}"><div class="item" data-animeid = ${anime.mal_id}>
                    <img class="anime-image" src="${anime.images.jpg.large_image_url}"/>
                    <div class="anime-data hidden">
                      <p class="anime-title">${anime.title}</p>
                    </div>
                  </div>
                  </a>
                  <a><button class="removeFromWL" data-mal=${anime.mal_id}>Remove</button></a>
                  </div>`;

  searchResults.insertAdjacentHTML("beforeend", html);

  //pagination.classList.remove("hidden");
};

//Pagination Not yet Integrated

// let pageNum;

// const fillThePaginationNum = function (data, anime) {
//   for (let i = 0; i < data.pagination.last_visible_page; i++) {
//     const html = `<div class="button"><p>${i + 1}</p></div>`;

//     pagination.insertAdjacentHTML("beforeend", html);
//   }

//   document.querySelectorAll(".button").forEach((element) => {
//     element.addEventListener("click", function () {
//       pageNum = Number(element.textContent);
//       request(anime, pageNum);

//       searchSection.scrollIntoView({ behavior: "smooth" });
//     });
//   });
// };

searchResults.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("anime-image")) {
    const imgContainer = e.target.closest("div");
    const img = e.target.closest("img");
    const animeData = e.target.closest("div").querySelector(".anime-data");

    imgContainer.style.backgroundColor = "black";
    img.style.opacity = 0.4;
    animeData.classList.remove("hidden");
    imgContainer.style.transform = "scale(105%)";
    animeData.style.opacity = 1;
  }
});

searchResults.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("anime-image")) {
    const imgContainer = e.target.closest("div");
    const img = e.target.closest("img");
    const animeData = e.target.closest("div").querySelector(".anime-data");

    imgContainer.style.backgroundColor = "";
    img.style.opacity = 1;
    animeData.classList.add("hidden");
    imgContainer.style.transform = "scale(100%)";
    animeData.style.opacity = 0;
  }
});

//Deleting the anime from user's watchList
// const animesToDelete = searchResults.querySelectorAll(".removeFromWL");

function deleteAnimeFromWL() {
  const malIdToDelete = Number(this.dataset.mal);

  try {
    const deleteAnime = async function () {
      const response = await fetch(
        `http://localhost:8080/watchList/${localStorage.getItem(
          "userId"
        )}/${malIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        showModalAndOverlay(
          "The selected anime to remove has been removed Successfully",
          data.response,
          "remove",
          "remove"
        );
      } else {
        showModalAndOverlay(
          "The selected anime wasn't removed from watch list",
          data.response
        );
      }

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    };

    deleteAnime();
  } catch (err) {
    console.error(err.message);
  }
}
