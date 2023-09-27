const weatherElems = {
  cityTextEl: document.querySelector(".location__text"),
  dayOfWeekEl: document.querySelector("[data-date]"),
  dayNumEl: document.querySelector("[date-num]"),
  monthTextEl: document.querySelector("[data-month]"),
  timeTextEl: document.querySelector("[data-time]"),
  currentDegree: document.querySelector("[data-degree]"),
  currentWeatherIcon: document.querySelector(".hero__main-weather-ico"),
  feelsLikeEl: document.querySelector("[data-feels-like]"),
  windEl: document.querySelector("[data-wind]"),
  humidity: document.querySelector("[data-humidity]"),
  firstDay: {
    firstDayOfWeekEl: document.querySelector("[data-first-day]"),
    firstDayOfWeekDegreeEl: document.querySelector("[data-first-degree]"),
    firstDayOfWeekIcon: "",
  },
  secondDay: {
    secondDayOfWeekEl: document.querySelector("[data-second-day]"),
    secondDayOfWeekDegreeEl: document.querySelector("[data-second-degree]"),
    secondDayOfWeekIcon: "",
  },
  thirdDay: {
    thirdDayOfWeekEl: document.querySelector("[data-third-day]"),
    thirdDayOfWeekDegreeEl: document.querySelector("[data-third-degree]"),
    thirdDayOfWeekIcon: "",
  },
};

console.log(weatherElems);

const weatherIcons = {
  clearSkyIco: "",
};

const DateClass = new Date();
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//# Api start

const formEl = document.querySelector(".search__form");
const errorTextEl = document.querySelector("[data-search-error]");
let errors = 0;
formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  errors = 0;
  errorTextEl.classList.add("error-hidden");
  errorTextEl.textContent = "";
  if (this.cityInput.value === "") {
    errors += 1;
    // console.log(errorTextEl);
    errorTextEl.textContent = "The field is empty";
    errorTextEl.classList.remove("error-hidden");
  } else if (
    this.cityInput.value.length < 3 ||
    this.cityInput.value.length > 25
  ) {
    errors += 1;
    if (errorTextEl.textContent === "") {
      errorTextEl.textContent = "Type a valid city";
    }
    errorTextEl.classList.remove("error-hidden");
  } else if (errors === 0) {
    console.log("last work");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput.value}&appid=9a6c5b632623b9a0c279060fc1b94b4d`
    )
      .then((resp) => resp.json())
      .then(function (data) {
        console.log(data);
        weatherElems.cityTextEl.textContent = `${data.name}, ${data.sys.country}`;
        weatherElems.timeTextEl.textContent = `${DateClass.getHours()}:${DateClass.getMinutes()}`;
        weatherElems.dayOfWeekEl.textContent = `${
          weekdayNames[DateClass.getDay()]
        }`;
        weatherElems.dayNumEl.textContent = `${DateClass.getDate()}`;
        weatherElems.monthTextEl.textContent = `${
          monthsNames[DateClass.getMonth()]
        }`;
        weatherElems.currentDegree.textContent = `${Math.round(
          data.main.temp - 273
        )}`;

        //# icons...

        if (data.weather[0].main === "Clear") {
          if (data.weather[0].icon === "01d") {
            weatherElems.currentWeatherIcon.src = "../img/icons/sun.png";
          } else if (data.weather[0].icon === "01n") {
            weatherElems.currentWeatherIcon.src = "../img/icons/moon.png";
          }
        }

        if (data.weather[0].main === "Clouds") {
          if (data.weather[0].icon === "02d") {
            weatherElems.currentWeatherIcon.src = "../img/icons/cloudsSunD.png";
          } else if (data.weather[0].icon === "02n") {
            weatherElems.currentWeatherIcon.src =
              "../img/icons/cloudsMoonN.png";
          } else if (data.weather[0].icon === "03d") {
            weatherElems.currentWeatherIcon.src = "../img/icons/cloudsun.png";
          } else if (data.weather[0].icon === "03n") {
            weatherElems.currentWeatherIcon.src = "../img/icons/cloudmoon.png";
          } else if (
            data.weather[0].icon === "03d" ||
            data.weather[0].icon === "03n"
          ) {
            weatherElems.currentWeatherIcon.src = "../img/icons/twoclouds.png";
          } else if (
            data.weather[0].icon === "04d" ||
            data.weather[0].icon === "04n"
          ) {
            weatherElems.currentWeatherIcon.src = "../img/icons/twoclouds.png";
          }
        }

        if (
          data.weather[0].main === "Smoke" ||
          data.weather[0].main === "Haze" ||
          data.weather[0].main === "Dust" ||
          data.weather[0].main === "Fog" ||
          data.weather[0].main === "Sand" ||
          data.weather[0].main === "Ash" ||
          data.weather[0].main === "Squall" ||
          data.weather[0].main === "Tornado"
        ) {
          weatherElems.currentWeatherIcon.src = "../img/icons/cloudFog.png";
        } else if (data.weather[0].description === "mist") {
          weatherElems.currentWeatherIcon.src = "../img/icons/sunFog.png";
        }

        if (
          data.weather[0].description === "light snow" ||
          data.weather[0].description === "light shower sleet" ||
          data.weather[0].description === "light rain and snow"
        ) {
          weatherElems.currentWeatherIcon.src = "../img/icons/cloud1snow.png";
        } else if (
          data.weather[0].description === "snow" ||
          data.weather[0].description === "sleet" ||
          data.weather[0].description === "shower sleet" ||
          data.weather[0].description === "rain and snow" ||
          data.weather[0].description === "shower snow"
        ) {
          weatherElems.currentWeatherIcon.src = "../img/icons/snow.png";
        } else if (
          data.weather[0].description === "heavy snow" ||
          data.weather[0].description === "heavy shower snow"
        ) {
          weatherElems.currentWeatherIcon.src = "../img/icons/cloudsnow.png";
        } else if (data.weather[0].description === "light shower snow") {
          weatherElems.currentWeatherIcon.src = "../img/icons/snows.png";
        }

        if (data.weather[0].main === "Rain") {
          if (
            data.weather[0].description === "light rain" ||
            data.weather[0].description === "moderate rain" ||
            data.weather[0].description === "light intensity shower rain"
          ) {
            weatherElems.currentWeatherIcon.src = "../img/icons/lightRain.png";
          } else if (
            data.weather[0].description === "shower rain" ||
            data.weather[0].description === "ragged shower rain"
          ) {
            weatherElems.currentWeatherIcon.src = "../img/icons/rains.png";
          } else if (
            data.weather[0].description === "heavy intensity rain" ||
            data.weather[0].description === "freezing rain" ||
            data.weather[0].description === "heavy intensity shower rain"
          ) {
            weatherElems.currentWeatherIcon.src =
              "../img/icons/cloudRainDeg.png";
          } else if (
            data.weather[0].description === "very heavy rain" ||
            data.weather[0].description === "extreme rain"
          ) {
            weatherElems.currentWeatherIcon.src = "../img/icons/cloud2rain.png";
          }
        }

        if (data.weather[0].main === "Drizzle") {
          weatherElems.currentWeatherIcon.src = "../img/icons/cloud90.png";
        }

        if (data.weather[0].main === "Thunderstorm") {
          if (
            data.weather[0].description === "thunderstorm with light rain" ||
            data.weather[0].description === "thunderstorm with light drizzle" ||
            data.weather[0].description === "thunderstorm with drizzle" ||
            data.weather[0].description === "thunderstorm with heavy drizzle"
          ) {
            weatherElems.currentWeatherIcon.src =
              "../img/icons/drizzleThunder.png";
          } else if (
            data.weather[0].description === "thunderstorm with rain" ||
            data.weather[0].description === "thunderstorm with heavy rain" ||
            data.weather[0].description === "heavy thunderstorm"
          ) {
            weatherElems.currentWeatherIcon.src =
              "../img/icons/cloudrainthunder.png";
          } else if (
            data.weather[0].description === "thunderstorm" ||
            data.weather[0].description === "light thunderstorm" ||
            data.weather[0].description === "ragged thunderstorm"
          ) {
            weatherElems.currentWeatherIcon.src = "../img/icons/cloudTh.png";
          }
        }

        //# icons end

        weatherElems.feelsLikeEl.textContent = `${Math.round(
          data.main.feels_like - 273
        )}`;
        weatherElems.windEl.textContent = `${Math.round(data.wind.speed)} `;
        weatherElems.humidity.textContent = `${Math.round(data.main.humidity)}`;
      });
  }
});