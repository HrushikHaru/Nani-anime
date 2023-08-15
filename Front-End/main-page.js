const searchedAnime = document.querySelector(".search-anime");
const searchIcon = document.querySelector(".search-icon-anime");
const searchResults = document.querySelector(".search-results");
const errorMessage = document.querySelector(".search-anime-show h2");
const showError = document.querySelector(".show-error p");

const searchAnime = document.querySelector(".search-anime");
const searchIconBtn = document.querySelector(".search-icon-anime");
const searchSection = document.querySelector(".search-anime-show");
const searchSection2 = document.querySelector(".btn-search");
const inputAnime = document.querySelector(".input-anime");
const pagination = document.querySelector(".pagination");
const navigation = document.querySelector(".navigation");

const preLoader = document.querySelector(".pre-loader");
const preLoader2 = document.querySelector(".pre-loader-2");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const animeGenres = document.querySelector(".anime-genres");

const swiper = new Swiper(".swiper", {
  // Optional parameters
  //   direction: "vertical",
  //   loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const getRecommendedAnimes = async function () {
  preLoader.classList.add("show");
  const response = await fetch("https://api.jikan.moe/v4/top/anime");

  const data = await response.json();
  preLoader.classList.remove("show");

  data.data.forEach((element, i) => {
    if (i < 10) {
      const html = `<div class="swiper-slide" data-id="${element.mal_id}">
      <div class="img-box">
      <img src="${element.images.jpg.large_image_url}" class="swiper-img"/>
      </div>
      <div class="anime-desc">
        <p class="rank">#${element.rank}</p>
        <p class="title">${element.title}</p>
        <p class="episodes">Episodes : ${element.episodes}</p>
        <p class="status">Status : ${element.status}</p>
        <p class="synopsis">${element.synopsis.slice(0, -25).trim()}</p>
      </div>
      </div>`;

      swiperWrapper.insertAdjacentHTML("beforeend", html);
    }
  });

  const swiperSlideBtns = document.querySelectorAll(".swiper-slide");

  swiperSlideBtns.forEach((swiper, i, arr) => {
    swiper.addEventListener("click", getTheAnimeIdAndForward);
  });
};

getRecommendedAnimes();

function getTheAnimeIdAndForward(e) {
  const malId = this.dataset.id;

  location.href = `anime.html?animeId=${malId}&from=main`;
}

//Seasons
const request = async function (page = 1) {
  pagination.innerHTML = "";
  searchResults.innerHTML = "";
  showError.textContent = "";
  pagination.innerHTML = "";
  try {
    preLoader2.classList.add("show");
    const response = await fetch(
      `https://api.jikan.moe/v4/seasons/now?q=&sfw&limit=20&page=${page}`
    );

    //Error for response
    if (!response.ok) {
      throw new Error(
        `You're making too many requests, please request once in every 3 seconds.`
      );
    }

    const data = await response.json();

    preLoader2.classList.remove("show");

    // nextPagePagination2(anime, data);
    if (data.data.length === 0) throw new Error("No Anime Found");

    fillTheSearchData(data);
    fillThePaginationNum(data);
    //preLoader.classList.remove("show");
  } catch (err) {
    console.error(err.message);
    showError.textContent = err.message;
  }
};

const fillTheSearchData = function (data) {
  data.data.forEach((anime, i) => {
    const html = `<a href="anime.html?animeId=${anime.mal_id}&from=main"><div class="item" data-animeid = ${anime.mal_id}>
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

const fillThePaginationNum = function (data) {
  for (let i = 0; i < data.pagination.last_visible_page; i++) {
    const html = `<div class="button"><p>${i + 1}</p></div>`;

    pagination.insertAdjacentHTML("beforeend", html);
  }

  document.querySelectorAll(".button").forEach((element) => {
    element.addEventListener("click", function () {
      pageNum = Number(element.textContent);
      request(pageNum);

      animeGenres.scrollIntoView({ behavior: "smooth" });
    });
  });
};

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

request();
