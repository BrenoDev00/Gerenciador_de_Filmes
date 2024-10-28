const searchButton = document.getElementById("search-button");
const modalOverlay = document.querySelector(".modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

async function searchButtonClickHandler() {
  modalOverlay.classList.add("open");

  let url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName.value
    .split(" ")
    .join("+")}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
}

searchButton.addEventListener("click", searchButtonClickHandler);
