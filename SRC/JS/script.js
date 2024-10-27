const searchButton = document.getElementById("search-button");
const modalOverlay = document.querySelector(".modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

function searchButtonClickHandler() {
  modalOverlay.classList.add("open");
  console.log(movieName.value.split(" ").join("+"));
  console.log("Ano: ", movieYear.value);
}

searchButton.addEventListener("click", searchButtonClickHandler);
