//API BASE
const api = {
  key: "49f6000f83e2d3c9a1c7e24b3e4f971e",
  base: "https://api.openweathermap.org/data/2.5/",
};

//On window application load event, loading coordinates
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      getCurrentResults(long, lat);
    });
  }
});

//Function responsible for getting forecast for current location
function getCurrentResults(long, lat) {
  fetch(
    `${api.base}weather?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`
  )
    .then((weatherCurrent) => {
      return weatherCurrent.json();
    })
    .then(displayCurrentResults);
}

//Function responsible for showing forecast result for current location
function displayCurrentResults(weatherCurrent) {
  let city = document.querySelector("#forecastLocation .city");
  city.innerText = `${weatherCurrent.name}, ${weatherCurrent.sys.country}`;

  let now = new Date();
  let date = document.querySelector("#forecastLocation .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weatherCurrent.main.temp)}°C`;

  let weather_el = document.querySelector(".weather");
  weather_el.innerText = weatherCurrent.weather[0].main;

  let lowTemp = document.querySelector(".lowTemp");
  lowTemp.innerText = `${Math.round(weatherCurrent.main.temp_min)}°C`;

  let hiTemp = document.querySelector(".hiTemp");
  hiTemp.innerText = `${Math.round(weatherCurrent.main.temp_max)}°C`;

  let hum = document.querySelector(".infoBox .humidity");
  hum.innerText = `${weatherCurrent.main.humidity}%`;

  let pre = document.querySelector(".infoBox .pressure");
  pre.innerText = `${weatherCurrent.main.pressure} hPa`;

  let visibility = document.querySelector(".infoBox .visibility");
  visibility.innerText = `${weatherCurrent.visibility} m`;

  let wSpeed = document.querySelector(".infoBox .wSpeed");
  wSpeed.innerText = `${weatherCurrent.wind.speed} m/s`;

  let wDirection = document.querySelector(".infoBox .wDirection");
  let deg = weatherCurrent.wind.deg;
  wDirection.innerText = windDirection(deg);

  let sunrise = document.querySelector(".infoBox .sunrise");
  let sunriseTime = weatherCurrent.sys.sunrise;
  sunriseObj = new Date(sunriseTime * 1000);
  sunriseString = sunriseObj.toUTCString();
  srtime = sunriseString.slice(-11, -4);
  sunrise.innerText = srtime + ` AM`;

  let sunset = document.querySelector(".infoBox .sunset");
  let sunsetTime = weatherCurrent.sys.sunset;
  sunsetObj = new Date(sunsetTime * 1000);
  sunsetString = sunsetObj.toUTCString();
  sstime = sunsetString.slice(-11, -4);
  sunset.innerText = sstime + ` PM`;

  /*
  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherCurrent.weather[0].icon}@2x.png" alt="icon"/>`;
  */
}
/*
//Function which start by clicking search icon resonsible for showing search box
document.getElementById("buttonSearch").onclick = function () {
  searchCityBox();
};
function searchCityBox() {
  document.getElementById("info").style.display = "none";
  document.getElementById("buttonSearch").style.display = "none";
  document.getElementById("searchBox").style.display = "block";
  document.getElementById("buttonBack").style.display = "block";
}

//Function start by clicking exit icon responsible for closing search box
document.getElementById("buttonBack").onclick = function () {
  buttonCityBack();
};
function buttonCityBack() {
  document.getElementById("info").style.display = "block";
  document.getElementById("buttonSearch").style.display = "block";
  document.getElementById("searchBox").style.display = "none";
  document.getElementById("buttonBack").style.display = "none";
}

//Function responsible for starting function setQuery on keypress
const searchbox = document.querySelector(".searchBox");
searchbox.addEventListener("keypress", setQuery);

//Function responsible for starting function getResults if user click enter
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    document.getElementById("buttonBack").style.display = "none";
  }
}

//Function responsible for downloading forecast for destination from search box
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
  document.getElementById("info").style.display = "block";
  document.getElementById("buttonSearch").style.display = "block";
  document.getElementById("searchBox").style.display = "none";
}

//Function responsible for displaying forecast for destination from search box
function displayResults(weather) {
  let city = document.querySelector(".info .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".info .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".low-high");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;

  let hum = document.querySelector(".infobox2 .humidity");
  hum.innerText = `${weather.main.humidity}%`;

  let pre = document.querySelector(".infobox2 .pressure");
  pre.innerText = `${weather.main.pressure} hPa`;

  let wSpeed = document.querySelector(".infobox2 .wSpeed");
  wSpeed.innerText = `${weather.wind.speed} m/s`;

  let wDirection = document.querySelector(".infobox2 .wDirection");
  let deg = weather.wind.deg;
  wDirection.innerText = windDirection(deg);

  let sunrise = document.querySelector(".infobox2 .sunrise");
  let sunriseTime = weather.sys.sunrise;
  sunriseObj = new Date(sunriseTime * 1000);
  sunriseString = sunriseObj.toUTCString();
  srtime = sunriseString.slice(-11, -4);
  sunrise.innerText = srtime + ` AM`;

  let sunset = document.querySelector(".infobox2 .sunset");
  let sunsetTime = weather.sys.sunset;
  sunsetObj = new Date(sunsetTime * 1000);
  sunsetString = sunsetObj.toUTCString();
  sstime = sunsetString.slice(-11, -4);
  sunset.innerText = sstime + ` PM`;

  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/>`;
  bgColor();
}
*/

//Function responsible for counting wind direction
function windDirection(degree) {
  if (degree > 348.5) {
    return "N";
  } else if (degree > 292.5) {
    return "North Westerly";
  } else if (degree > 247.5) {
    return "Westerly";
  } else if (degree > 202.5) {
    return "South Westerly";
  } else if (degree > 157.5) {
    return "Southerly";
  } else if (degree > 122.5) {
    return "South Easterly";
  } else if (degree > 67.5) {
    return "Easterly";
  } else if (degree > 22.5) {
    return "North Easterly";
  } else if (degree < 11.5) {
    return "North";
  } else {
    return "No Data";
  }
}

//Function responsible for counting current date and day of week
function dateBuilder(d) {
  let dates = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = dates[d.getDate()];
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date}/${month}/${year}`;
}
