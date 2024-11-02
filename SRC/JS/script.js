const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const modalOverlay = document.querySelector(".modal-overlay");
const modalContainer = document.querySelector(".modal-container");
const searchButton = document.getElementById("search-button");
const movieListContainer = document.querySelector(".movie-list");
const apiKey = "649a4725";

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

let currentMovie = {};

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUI(movieInfo);
}

function removeFilmFromList(id) {
  movieList = movieList.filter((movie) => movie.imdbID !== id);

  document.getElementById(`movie-card-${id}`).remove();

  updateLocalStorage();
}

function isMovieAlreadyOnList(id) {
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }

  return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function updateUI(movieObject) {
  movieListContainer.innerHTML += `<article id="movie-card-${movieObject.imdbID}">
          <img
            src="${movieObject.Poster}"
            alt="Poster de ${movieObject.Title}."
          />

          <button class="remove-movie-button" onclick="{removeFilmFromList('${movieObject.imdbID}')}" type="button">
            <i class="bi bi-trash"></i> Remover
          </button>
        </article>`;
}

function closeMovieModal() {
  modalOverlay.classList.remove("open");
}

function addCurrentMovieToList() {
  if (isMovieAlreadyOnList(currentMovie.imdbID)) {
    notie.alert({ type: "error", text: "Filme já está na sua lista!" });
    return;
  }

  addToList(currentMovie);
  updateUI(currentMovie);
  updateLocalStorage();
  closeMovieModal();
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

function showMovieModal(data) {
  currentMovie = data;

  modalContainer.innerHTML = `
  <h2 class="movie-title">${data.Title} - ${data.Year}</h2>

  <section class="modal-body">
    <img
      class="movie-poster"
      src=${data.Poster}
      alt="Poster de ${data.Title}."
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
    <button type="button" onclick='{addCurrentMovieToList()}' id="add-movie-button">
      Adicionar à Lista
    </button>
  </section>`;
}

async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieNameParameterGenerator()}&y=${movieYearParameterGenerator()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Error) {
      throw new Error("Filme não encontrado");
    }

    console.log(data);

    showMovieModal(data);
    modalOverlay.classList.add("open");
  } catch (error) {
    notie.alert({ text: error.message, type: "error" });
  }
}

searchButton.addEventListener("click", searchButtonClickHandler);
