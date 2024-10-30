document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalBackground = document.querySelector(".modal-background");

  modalOverlay.classList.remove("open");

  function backgroundClickHandler() {
    modalOverlay.classList.remove("open");
  }

  modalBackground.addEventListener("click", backgroundClickHandler);
});
