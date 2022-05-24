// ------------------------------
// IMPORTS AND DECLARATIONS
// ------------------------------
import { isReadyToClick } from "./zoom";
import {
  eventsArr,
  othersArr,
  enterntainmentArr,
  personalArr,
  fullArr,
} from "./list";
export const kraje = document.querySelectorAll(".travelBox svg path");
const modalBackground = document.createElement("div");
const modalMap = document.createElement("div");
modalMap.classList.add("modalMap");
modalBackground.appendChild(modalMap);
document.body.appendChild(modalBackground);
modalBackground.classList.add("modalBackground");
let travelSelectBtn;
const travelSelect = document.createElement("div");
travelSelect.innerHTML = `DODAJ <span class="d-none d-xl-inline">&nbspDO LISTY</span>`;
const closingBtn = document.createElement("button");
closingBtn.classList.add("closingBtn");
closingBtn.innerHTML = "X";

// ------------------------------
// DECLARATION OF TRAVEL ARRAY +
// SESSION STORAGE OF TRAVEL ARRAY
// ------------------------------
export let travelArr = [];
export let travelMemory = JSON.parse(
  sessionStorage.getItem("travelSessionArr")
);

if (travelMemory !== null) {
  travelArr = travelMemory;
}

// ------------------------------
// LOADING COUNTRIES FROM JSON
// ------------------------------

const readJson = async function () {
  const countriesJSON = require("../../assets/countries.json");
  const response = await fetch(countriesJSON);
  const data = await response.json();
  const countries = data;

  // ------------------------------
  // CREATING MODAL WITH DATA
  // FROM WEATHER API
  // ------------------------------

  const openIt = function (kraj) {
    for (let i = 0; i < countries.Countries.length; i++) {
      if (kraj.getAttribute("name") === countries.Countries[i].name) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            countries.Countries[i].capital +
            "&&appid=aa1390a55af9f6c7ae1a6fa751cd483d&lang=PL&units=metric"
        )
          .then((response) => response.json())
          .then((data) => {
            modalMap.innerHTML = `
            
            <div class="leftModal">

            <img class="flagModal" src="${countries.Countries[i].flag}">
            <img class="emblemModal" src="${countries.Countries[i].emblem}">
            
            </div>`;

            modalMap.innerHTML += `
            
            <div class="middleModal">
            
            <h1>${countries.Countries[i].name}</h1>

            <ul>
            <li>Liczba ludności: ${countries.Countries[i].population}</li>
            <li>Język urzędowy: ${countries.Countries[i].language.name}</li>
            </ul>
            
            <ul>
            <li>${countries.Countries[i].info1}</li>
            <li>${countries.Countries[i].info2}</li>
            <li>${countries.Countries[i].info3}</li>
            <li class="d-none d-sm-block">${countries.Countries[i].info4}</li>
            <li class="d-none d-sm-block">${countries.Countries[i].info5}</li>
            </ul>
            
            </div>`;

            modalMap.innerHTML += `
            <div class="rightModal">

            <h3>${countries.Countries[i].capital}</h3>
            <img class="weatherModal" src="http://openweathermap.org/img/w/${
              data.weather[0].icon
            }.png">
            <div class="temperatureModal">${parseInt(
              data.main.temp
            )}<sup>o</sup>C</div>
            
            </div>`;
            modalMap.appendChild(closingBtn);
            modalMap.appendChild(travelSelect);
          });

        travelSelect.classList.add("travelSelectBtn");
      }
    }

    // ------------------------------
    // CLOSING MODAL BY CLICKING ON
    // BACKGROUND, CLICKING X BUTTON
    // AND CLICKING ESCAPE
    // ------------------------------

    const closeModal = () => {
      modalBackground.style.display = "none";
      travelSelectBtn.remove();
    };
    window.addEventListener("click", function (e) {
      if (e.target == modalBackground) {
        closeModal();
      }
    });

    closingBtn.addEventListener("click", closeModal);

    document.body.addEventListener("keydown", function (e) {
      if (e.key == "Escape") {
        closeModal();
      }
    });

    // ------------------------------
    // ADDING ATTRIBUTE CHECKED IF
    // COUNTRY IS PRESENT IN THE ARRAY
    // ------------------------------

    travelSelectBtn = document.createElement("input");
    travelSelectBtn.setAttribute("type", "checkbox");
    travelSelect.appendChild(travelSelectBtn);

    if (travelArr.includes(kraj.getAttribute("id"))) {
      travelSelectBtn.setAttribute("checked", "checked");
    } else {
      travelSelectBtn.removeAttribute("checked");
    }

    // ------------------------------
    // ADDING AND REMOVING COUNTRY TO
    // ARRAY BY CLICKING ON CHECKBOX
    // ------------------------------

    travelSelectBtn.addEventListener("click", () => {
      if (travelSelectBtn.getAttribute("checked") === "checked") {
        travelSelectBtn.removeAttribute("checked");
        for (let i = 0; i < travelArr.length; i++) {
          if (travelArr[i] === kraj.getAttribute("id")) {
            travelArr.splice(i, 1);
          }
        }
      } else {
        travelSelectBtn.setAttribute("checked", "checked");
        travelArr.push(kraj.getAttribute("id"));
      }
      fullArr.superArray = eventsArr.concat(
        personalArr,
        enterntainmentArr,
        othersArr,
        travelArr
      ).length;
      document.querySelector("#numberList").innerHTML = fullArr.superArray;
      sessionStorage.setItem("travelSessionArr", JSON.stringify(travelArr));
    });

    modalMap.style.display = "flex";
    modalBackground.style.display = "flex";
  };

  // ------------------------------
  // OPENING MODAL BY CLICKING ON
  // A COUNTRY
  // ------------------------------

  const openModal = function (kraj) {
    kraj.addEventListener("click", () => {
      if (isReadyToClick === true) {
        openIt(kraj);
      }
    });
  };

  kraje.forEach(openModal);

  // ------------------------------
  // OPENING MODAL BY CLICKING
  // ON SUGGESTION
  // ------------------------------

  window.addEventListener("click", (e) => {
    kraje.forEach((kraj) => {
      if (e.target.classList.contains("singleSuggestion")) {
        if (e.target.innerHTML == kraj.getAttribute("name")) {
          openIt(kraj);
        }
      }
    });
  });
};
readJson();
