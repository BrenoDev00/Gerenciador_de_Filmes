const searchButton = document.getElementById("search-button");
const modalOverlay = document.querySelector(".modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const apiKey = "649a4725";

async function searchButtonClickHandler() {
  try {
    modalOverlay.classList.add("open");

    let url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieNameParameterGenerator()}&y=${movieYearParameterGenerator()}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("Informe o nome do filme");
  }
  return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (movieYear.value === "") {
    return "";
  }

  if (movieYear.value.length !== 4 || isNaN(Number(movieYear.value))) {
    throw new Error("Ano do filme inválido");
  }

  return `&y=${movieYear.value}`;
}

searchButton.addEventListener("click", searchButtonClickHandler);
