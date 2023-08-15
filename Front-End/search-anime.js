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

//To toggle between login button and user-Frame
const userFrame = document.querySelector(".user-frame");
const userProfile = document.querySelector(".user-profile");
const logOutLink = document.querySelector(".logout-link");

// 3.
const fillTheSearchData = function (animeName, data) {
  data.data.forEach((anime, i) => {
    const html = `<a href="anime.html?animeId=${anime.mal_id}&animeName=${inputAnime.value}"><div class="item" data-animeid = ${anime.mal_id}>
                    <img class="anime-image" src="${anime.images.jpg.large_image_url}"/>
                    <div class="anime-data hidden">
                      <p class="anime-title">${anime.title}</p>
                    </div>
                  </div></a>`;

    searchResults.insertAdjacentHTML("beforeend", html);

    pagination.classList.remove("hidden");
  });
};

// 4.
let pageNum;

const fillThePaginationNum = function (data, anime) {
  for (let i = 0; i < data.pagination.last_visible_page; i++) {
    const html = `<div class="button"><p>${i + 1}</p></div>`;

    pagination.insertAdjacentHTML("beforeend", html);
  }

  document.querySelectorAll(".button").forEach((element) => {
    element.addEventListener("click", function () {
      pageNum = Number(element.textContent);
      request(anime, pageNum);

      searchSection.scrollIntoView({ behavior: "smooth" });
    });
  });
};

// 2.
const request = async function (anime, page = 1) {
  pagination.innerHTML = "";
  searchResults.innerHTML = "";
  showError.textContent = "";
  pagination.innerHTML = "";
  try {
    preLoader.classList.add("show");
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${anime}&sfw&limit=20&page=${page}`
    );

    //Error for response
    if (!response.ok) {
      throw new Error(
        `You're making too many requests, please request once in every 3 seconds.`
      );
    }

    preLoader.classList.remove("show");
    const data = await response.json();

    // nextPagePagination2(anime, data);
    if (data.data.length === 0) throw new Error("No Anime Found");

    fillTheSearchData(anime, data);
    fillThePaginationNum(data, anime);
  } catch (err) {
    console.error(err);
    preLoader.classList.remove("show");
    showError.textContent = err.message;
  }
};

// 1.
let animeStr;

searchSection2.addEventListener("click", function () {
  animeStr = "";
  animeStr = inputAnime.value;

  request(animeStr);
});

// 5.
searchResults.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("anime-image")) {
    const imgContainer = e.target.closest("div");
    const img = e.target.closest("img");
    const animeData = e.target.closest("div").querySelector(".anime-data");

    imgContainer.style.backgroundColor = "black";
    img.style.opacity = 0.4;
    animeData.classList.remove("hidden");
    imgContainer.style.transform = "scale(110%)";
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

// function toCallBackFromAnimePage(animeToGet) {
//   inputAnime.value = animeToGet;
//   request(animeToGet);
// }

// toCallBackFromAnimePage(animeToGet);

//Call from the home page to search for anime
const url = new URL(window.location.href);

const params = url.searchParams.get("animeSearch");

function searchAnimeByIndexPage(animeName) {
  inputAnime.value = animeName;
  request(animeName);
}

searchAnimeByIndexPage(params);

// // Set a cookie with a name, value, and expiration date
// function setCookie(cookieName, cookieValue, expirationDays) {
//   const date = new Date();
//   date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
//   const expires = "expires=" + date.toUTCString();
//   document.cookie =
//     cookieName + "=" + cookieValue + "; " + expires + "; path=/";
// }

// // Usage example
// setCookie("myCookie", inputAnime.value, 7);

const checkIfLoggedIn = function () {
  if (localStorage.getItem("token") != null) {
    //userFrame.style.display = "none";
    userProfile.classList.remove("hidden");
  }
};

checkIfLoggedIn();

const logOutUser = function () {
  logOutLink.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    userProfile.classList.add("hidden");
    //userFrame.style.display = "block";

    location.href = "index.html";
  });
};

logOutUser();
