// DECLARATIONS
// -------------------------

const okienko = document.querySelector(".searchingBar");
const suggestions = document.querySelector(".suggestions");
const xClosing = document.querySelector(".searching span");
let arrCountriesSearch = [];

// RESET SUGGESTIONS
// -------------------------

const reset = function () {
  arrCountriesSearch = [];
  suggestions.innerHTML = "";
  okienko.style.borderRadius = "5px";
};

// READ JSON
// -------------------------

const readJson = async function () {
  const countriesJSON = require("../../assets/countries.json");
  const response = await fetch(countriesJSON);
  const data = await response.json();
  const countries = data;

  // LOAD COUNTRIES
  // -------------------------

  const loadCountries = function (event) {
    reset();

    if (okienko.value != "") {
      xClosing.style.display = "block";
    } else {
      xClosing.style.display = "none";
    }
    for (i = 0; i < countries.Countries.length; i++) {
      if (
        countries.Countries[i].name
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase())
      ) {
        arrCountriesSearch.push(countries.Countries[i].name);
        okienko.style.borderRadius = "5px 5px 0 0";
      }
    }

    // GENERATE SUGGESTIONS
    // -------------------------

    arrCountriesSearch.forEach(function (item) {
      suggestions.innerHTML += `<li><a class= "singleSuggestion" href = "#${item}"">${item}</a></li>`;
    });

    // RESET IF EMPTY
    // -------------------------

    if (event.target.value == "" || arrCountriesSearch == "") {
      reset();
    }
  };

  okienko.addEventListener("input", loadCountries);
};

// RUN FUNCTION READJSON
// -------------------------

readJson();

// CLICK AND INPUT LISTENERS
// -------------------------

const clickToClose = function (event) {
  if (event.target.classList.contains("singleSuggestion")) {
    okienko.value = event.target.innerHTML;
    reset();
  } else if (event.target !== okienko) {
    reset();
  }

  if (okienko.value != "") {
    xClosing.style.display = "block";
  } else {
    xClosing.style.display = "none";
  }
};

const escapeToClose = function (event) {
  if (event.key == "Escape") {
    reset();
  }
};

const xToResetInput = function () {
  okienko.value = "";
  xClosing.style.display = "none";
};

const enterToResetInput = function (event) {
  if (event.key == "Enter") {
    okienko.value = "";
    xClosing.style.display = "none";
    reset();
  }
};

const focusPopular = function (event) {
  if (event.target.value == "" && arrCountriesSearch == "") {
    arrCountriesSearch = [
      "Francja",
      "Włochy",
      "Niemcy",
      "Portugalia",
      "Hiszpania",
    ];
    arrCountriesSearch.forEach(function (item) {
      suggestions.innerHTML += `<li><a class= "singleSuggestion" href = "#${item}">${item}</a></li><hr class = "bar">`;
    });
    okienko.style.borderRadius = "5px 5px 0 0";
  }
};

window.addEventListener("click", clickToClose);
window.addEventListener("keypress", escapeToClose);
window.addEventListener("focus", focusPopular, true);
xClosing.addEventListener("click", xToResetInput);
xClosing.addEventListener("keypress", enterToResetInput);
