let modeBtnEl = document.querySelector("#switch_to_dark");
let body = document.querySelector("body");
let screenMode = JSON.parse(localStorage.getItem("screenMode")) || "light";

// Toggle between dark and light mode. 
// When body has class 'dark', update screenMode to store 'dark' 
// on localStorage for updateOnLaunch() on next reload
modeBtnEl.addEventListener("click", function () {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    screenMode = localStorage.setItem("screenMode", JSON.stringify("dark"));
    modeBtnEl.textContent = "Change to Day";
  } else {
    screenMode = localStorage.setItem("screenMode", JSON.stringify("light"));
    modeBtnEl.textContent = "Change to Night";
  }
});

// Function to update the CSS of the site on launch 
function updateOnLaunch() {
  switch (screenMode) {
    case "light":
      body.classList.remove("dark");
      modeBtnEl.textContent = "Change to Night";
      console.log(screenMode);
      break;
    case "dark":
      body.classList.add("dark");
      modeBtnEl.textContent = "Change to Day";
      console.log(screenMode);
      break;
  }
}

updateOnLaunch();