function swishToDark() {
  let body = document.querySelector("body");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    changeToDay.innerHTML = "Change to Night";
  } else {
    body.classList.add("dark");
    changeToDay.innerHTML = "Change to Day";
  }
}

let button = document.querySelector(".switch_to_dark");
button.addEventListener("click", swishToDark);

let changeToDay = document.querySelector("#switch_to_dark");
