/* ---------------------------------------------- */
/*            CODE EXPLAINED TUTORIALS            */
/*         www.youtube.com/CodeExplained          */
/* ---------------------------------------------- */

// SELECT ALL ELEMENTS

const countryNameElement = document.querySelector(".country .name");
const totalCasesElement = document.querySelector(".total-cases .value");
const newCasesElement = document.querySelector(".total-cases .new-value");
const recoveredElement = document.querySelector(".recovered .value");
const newRecoveredElement = document.querySelector(".recovered .new-value");
const deathsElement = document.querySelector(".deaths .value");
const newDeathsElement = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axesLineChart").getContext("2d");

// APP VARIABLES

let appData = [],
  casesList = [],
  recoveredList = [],
  deathsList = [],
  dates = [];

// GET USERS COUNTRY CODE

let countryCode = geoplugin_countryCode();
let userCountry;

countryList.forEach((country) => {
  if (country.code == countryCode) {
    userCountry = country.name;
  }
});

// console.log(userCountry);
fetch(
  "https://api.ipgeolocation.io/ipgeo?apiKey=14c7928d2aef416287e034ee91cd360d"
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let countryCode = data.countryCode2;
    let userCountry;
    country_list.forEach((country) => {
      if (country.code == countryCode) {
        userCountry = country.name;
      }
    });
    fetchData(userCountry);
  });
/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */
