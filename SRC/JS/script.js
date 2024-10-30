const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const modalOverlay = document.querySelector(".modal-overlay");
const modalContainer = document.querySelector(".modal-container");
const searchButton = document.getElementById("search-button");
const apiKey = "649a4725";

function showMovieModal(data) {
  modalContainer.innerHTML = `
  <h2 class="movie-title">${data.Title} - ${data.Year}</h2>

  <section class="modal-body">
    <img
      class="movie-poster"
      src=${data.Poster}
      alt="Poster do filme pesquisado"
    />

    <div class="movie-info">
      <p class="movie-plot">
        ${data.Plot}
      </p>

      <p class="movie-cast">
        <span class="text-highlighting">Actors</span>: ${data.Actors}
      </p>

      <p class="movie-genre">
        <span class="text-highlighting">Genre</span>: ${data.Genre}
      </p>
    </div>
  </section>

  <section class="modal-footer">
    <button type="button" id="add-movie-button">
      Adicionar à Lista
    </button>
  </section>`;
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

async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieNameParameterGenerator()}&y=${movieYearParameterGenerator()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Error) {
      throw new Error("Filme não encontrado");
    }

    showMovieModal(data);
    modalOverlay.classList.add("open");
  } catch (error) {
    notie.alert({ text: error.message, type: "error" });
  }
}

searchButton.addEventListener("click", searchButtonClickHandler);
