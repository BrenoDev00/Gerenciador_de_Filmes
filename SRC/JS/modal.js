document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalBackground = document.querySelector(".modal-background");
  const modalContainer = document.querySelector(".modal-container");

  modalOverlay.classList.add("open");

  function backgroundClickHandler() {
    modalOverlay.classList.remove("open");
  }

  function createModal(data) {
    modalBackground.innerHTML = `
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
          ${data.Actors}
        </p>

        <p class="movie-genre">
          <span class="text-highlighting">Gênero</span>: ${data.Genre}
        </p>
      </div>
    </section>

    <section class="modal-footer">
      <button type="button" id="add-movie-button">
        Adicionar à Lista
      </button>
    </section>`;
  }

  modalBackground.addEventListener("click", backgroundClickHandler);
});
