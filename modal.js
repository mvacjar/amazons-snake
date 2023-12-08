let modalToggleEl = document.querySelector("#modalToggle");
let modalEl = document.querySelector("#modal");
let modalInnerEl = document.querySelector(".modal__inner");
let closeButtonEl = document.querySelector("#closeButton");
let modalButtonEls = document.querySelectorAll("[data-modal]");
let textEl = document.querySelector("#text_modal");

for (let modalButtonEl of modalButtonEls) {
  let target = modalButtonEl.dataset.modal;
  let modalEl = document.querySelector("#" + target);

  modalButtonEl.addEventListener("click", function () {
    modalEl.classList.add("modal--show");
  });

  let closeButtonEl = modalEl.querySelector("[data-modal-close]");
  closeButtonEl.addEventListener("click", function () {
    modalEl.classList.remove("modal--show");
  });

  modalEl.addEventListener("click", function (e) {
    if (e.target === modalEl) {
      modalEl.classList.remove("modal--show");
    }
  });
}

async function getData() {
  try {
    let res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    let data = await res.json();
    let jokeModal = data.joke;
    textEl.textContent = jokeModal;
    console.log(jokeModal);
  } catch (error) {
    console.error(error);
  }
}

getData();
