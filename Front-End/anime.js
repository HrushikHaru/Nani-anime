const url = new URL(window.location.href);

const animeId = Number(url.searchParams.get("animeId"));

const headerClass = document.querySelector(".header");
const main = document.querySelector(".main");
const returnToSearch = document.querySelector(".returnToSearch");
const showAnimeInfo = document.querySelector(".showAnimeInfo");
const animeItemShowByID = document.querySelector(".anime-item-showById");
const showPreLoader = document.querySelector(".pre-loader-gif");
const returnToSearchPage = document.querySelector("#returnToSearchPage");

//Related to Dialog Modal
const dialogModal = document.querySelector("#modal");
const dialogMessage = document.querySelector(".dialogModal-message");

//Overlay and modal (normal)
const validationMessage = document.querySelector(".validation-desc");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modalClose");
const overlay = document.querySelector(".overlay");
const validation = document.querySelector(".validation");

function getAnimeOnNewPage() {
  animeItemShowByID.innerHTML = "";

  const animeFetchByID = async function (animeId) {
    showPreLoader.classList.add("show");
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/full`
    );

    const ratingResponse = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/statistics`
    );

    showPreLoader.classList.remove("show");
    const data = await response.json();

    const ratingData = await ratingResponse.json();

    const genres = data.data.genres.map((genre) => genre.name);

    let strip = "";
    let comma = ", ";

    for (let i = 0; i < genres.length; i++) {
      strip = strip + genres[i] + comma;
    }

    const str = strip.slice(0, -2);

    const html = `
          <div class="animeGetItem">
          <div class="animeTitleAddButton"
          <p class="animeGetTitle">${data.data.title}</p>
          <div id="watchlist" onclick="toggleWatchlist()">
            <span id="watchlist-text">Add to Watchlist</span>
          </div>
          </div>
          <div class="animeGet">
          <div class="animeGetImg">
            <img src="${data.data.images.jpg.large_image_url}" />
          </div>
          <div class="animeInfo">
            <p class="animeGetEngName"><span>Name : </span>${
              data.data.title_english || data.data.title
            }</p>
            <p class="animeGetJapName"><span>Japanese name : </span>${
              data.data.title_japanese
            }</p>
            <p class="animeGetPopularity"><span>Popularity : </span>${
              data.data.popularity
            }</p>
            <p class="animeGetEpisodes"><span>Episodes : </span>${
              data.data.episodes
            }</p>
            <p class="animeGetYear"><span>Year : </span>${
              data.data.year || 2023
            }</p>
            <p class="animeGetAiring"><span>Airing : </span>${
              data.data.status
            }</p>
            <p class="animeGetGenres"><span>Genres : </span>${str}</p>
            <p class="animeGetSynopsis"><span>Synopsis : </span>${
              data.data?.synopsis?.slice(0, -25).trim() ||
              "An anime to witness and watch for an astonishingly fun and surprises"
            }</p>
  
            <br>
            <p class="ratingAnime">${data.data.title}'s Views</p>
            <div class="rating">
              <div class="views">
                <p>Total</p>
                <div class="box total"></div>
                <p>${ratingData.data.total} (100%)</p>
              </div>
              <div class="views">
                <p>Completed</p>
                <div class="box completed"></div>
                <p>${ratingData.data.completed} (${Math.round(
      (ratingData.data.completed * 100) / ratingData.data.total
    )}%)
            </p>
              </div>
              <div class="views">
                <p>Plan to Watch</p>
                <div class="box plan_to_watch"></div>
                <p>${ratingData.data.plan_to_watch} (${Math.round(
      (ratingData.data.plan_to_watch * 100) / ratingData.data.total
    )}%)</p>
              </div>
              <div class="views">
                <p>Watching</p>
                <div class="box watching"></div>
                <p>${ratingData.data.watching} (${Math.round(
      (ratingData.data.watching * 100) / ratingData.data.total
    )}%)</p>
              </div>
              <div class="views">
                <p>On Hold</p>
                <div class="box on_hold"></div>
                <p>${ratingData.data.on_hold} (${Math.round(
      (ratingData.data.on_hold * 100) / ratingData.data.total
    )}%)</p>
              </div>
              <div class="views">
                <p>Dropped</p>
                <div class="box dropped"></div>
                <p>${ratingData.data.dropped} (${Math.round(
      (ratingData.data.dropped * 100) / ratingData.data.total
    )}%)</p>
              </div>
            </div>
  
          </div>
        </div>
        </div>`;

    //getANimeItem = document.querySelector(".animeGetItem");

    animeItemShowByID.insertAdjacentHTML("beforeend", html);

    const rangeChecker = document.querySelectorAll(".box");

    rangeChecker.forEach((element) => {
      const rangeElement = element.classList[1];

      const total = Number(ratingData.data.total);
      if (rangeElement === "total") {
        element.style.backgroundColor = `#000`;
      } else {
        const percentViews = Math.round(
          (ratingData.data[rangeElement] * 100) / total
        );

        element.style.background = `linear-gradient(to right, #000 ${percentViews}%, #fff 1%)`;
      }
    });
  };

  animeFetchByID(animeId);
}

getAnimeOnNewPage();

const showModalAndOverlay = function (str, valid) {
  validationMessage.textContent = "";
  validationMessage.textContent = str;

  validation.textContent = "";
  validation.textContent = valid;

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const addAnimeToWatchList = async function (mal_id, userId) {
  try {
    const response = await fetch("http://localhost:8080/watchList", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        mal_id: mal_id,
        userId: userId,
      }),
    });

    const responseCode = response.status;
    return responseCode;
  } catch (e) {
    console.log(e);
  }
};

//Adding watcllist info to DB
function toggleWatchlist() {
  const watchlist = document.getElementById("watchlist");
  const watchlistText = document.getElementById("watchlist-text");

  if (
    watchlistText.innerText === "Add to Watchlist" &&
    localStorage.getItem("token") != null
  ) {
    const extractResponse = async function () {
      const response = await addAnimeToWatchList(
        animeId,
        localStorage.getItem("userId")
      );

      if (response == 201) {
        showModalAndOverlay(
          "The anime has been added to the watchlist successfully.",
          "😇 Success!"
        );
      } else {
        showModalAndOverlay(
          "There was some error while adding the anime to Watchlist. Please try again later.",
          "😥 Failed to add"
        );
      }
    };

    extractResponse();
  } else {
    console.log("Hii");
    showModalAndOverlay(
      "Please log in to add to the watchlist",
      "Log-in to add!"
    );
  }
}

modalClose.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

function sendBackToSearchPage() {
  const queryParams = `animeSearch=${url.searchParams.get("animeName")}`;
  returnToSearchPage.href += "?" + queryParams;
}

function returnBackToWishList() {
  returnToSearchPage.href = "new-user-portal.html";
}

function returnBackToMainPage() {
  returnToSearchPage.href = "index.html";
}

if (url.searchParams.get("animeName")) {
  sendBackToSearchPage();
} else if (url.searchParams.get("from")) {
  returnBackToMainPage();
} else {
  returnBackToWishList();
}
