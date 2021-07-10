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

const canvas = document.getElementById("axesLineChart");
const ctx = canvas.getContext("2d");

console.log(ctx);

// APP VARIABLES
let appData = [],
  casesList = [],
  recoveredList = [],
  deathsList = [],
  deaths = [],
  formatedDates = [];

// GET USERS COUNTRY CODE
fetch(
  "http://api.ipstack.com/179.13.205.50?access_key=63b6363c29cf7572c24fbafe815562f9"
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let countryCode = data.countryCode2;
    let userCountry;
    countryList.forEach((country) => {
      if (country.code == countryCode) {
        userCountry = country.name;
      }
    });
    fetchData(userCountry);
  });

/* ---------------------------------------------- */
/*                     FETCH API                  */
/* ---------------------------------------------- */
function fetchData(country) {
  userCountry = country;
  countryNameElement.innerHTML = "Loading...";

  (casesList = []),
    (recoveredList = []),
    (deathsList = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const apiFetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" +
        country +
        "/status/confirmed",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          casesList.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" +
        country +
        "/status/recovered",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          recoveredList.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/deaths",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          deathsList.push(entry.Cases);
        });
      });

    updateUI();
  };

  apiFetch(country);
}

// UPDATE UI FUNCTION
function updateUI() {
  updateStats();
  axesLinearChart();
}

function updateStats() {
  const totalCases = casesList[casesList.length - 1];
  const newConfirmedCases = totalCases - casesList[casesList.length - 2];

  const totalRecovered = recoveredList[recoveredList.length - 1];
  const newTotalRecovered =
    totalRecovered - recoveredList[recoveredList.length - 2];

  const totalDeaths = deathsList[deathsList.length - 1];
  const newDeathsCases = totalDeaths - deathsList[deathsList.length - 2];

  countryNameElement.innerHTML = userCountry;
  totalCasesElement.innerHTML = totalCases;
  newCasesElement.innerHTML = `+${newConfirmedCases}`;
  recoveredElement.innerHTML = totalRecovered;
  newRecoveredElement.innerHTML = `+${newTotalRecovered}`;
  deathsElement.innerHTML = totalDeaths;
  newDeathsElement.innerHTML = `+${newDeathsCases}`;

  // format dates
  dates.forEach((date) => {
    formatedDates.push(formatDate(date));
  });
}

// UPDATE CHART
let myChart;
function axesLinearChart() {
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cases",
          data: casesList,
          fill: false,
          borderColor: "#FFF",
          backgroundColor: "#FFF",
          borderWidth: 1,
        },
        {
          label: "Recovered",
          data: recoveredList,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 1,
        },
        {
          label: "Deaths",
          data: deathsList,
          fill: false,
          borderColor: "#f44336",
          backgroundColor: "#f44336",
          borderWidth: 1,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// FORMAT DATES
const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);

  return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}
