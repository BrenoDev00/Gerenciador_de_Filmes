const searchButton = document.getElementById("search-button");
const modalOverlay = document.querySelector(".modal-overlay");

function searchButtonClickHandler() {
  modalOverlay.classList.add("open");
}

searchButton.addEventListener("click", searchButtonClickHandler);
