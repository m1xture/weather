// Custom Scripts
/**========================================================================
 *                           MENU BURGER
 *========================================================================**/
// (() => {
//     const refs = {
//       openModalBtn: document.querySelector('[data-mobile-open]'),
//       closeModalBtn: document.querySelector('[data-mobile-close]'),
//       modal: document.querySelector('[data-mobile]'),
//     };

//     refs.openModalBtn.addEventListener('click', toggleModal);
//     refs.closeModalBtn.addEventListener('click', toggleModal);

//     function toggleModal() {
//       document.body.classList.toggle('modal-open');
//       refs.modal.classList.toggle('is-hidden');
//     }
//   })();

// //! change bg
const heroRef = document.querySelector(".hero");
const changeImgRef = document.querySelector(".header__btn-bg");
const imgsArr = ["../../img/bg1.jpg", "../../img/bg2.jpg", "../../img/bg3.jpg"];
changeImgRef.addEventListener("click", () => {
  const min = 0;
  const max = imgsArr.length - 1;
  const idx = Math.round(Math.random() * (max - min) + min);
  const currentBgImage = heroRef.style.backgroundImage;

  const img = imgsArr[idx];
  if (currentBgImage) {
    // Якщо фонове зображення вже встановлене, видаляємо поточне зображення і встановлюємо нове
    heroRef.style.backgroundImage = `linear-gradient(
    180deg,
    rgba(8, 15, 26, 0.59) 0%,
    rgba(17, 17, 46, 0.46) 100%
  ), url(${img})`;
  } else {
    // Якщо фонового зображення ще немає, встановлюємо нове зображення
    heroRef.style.backgroundImage = `linear-gradient(
    180deg,
    rgba(8, 15, 26, 0.59) 0%,
    rgba(17, 17, 46, 0.46) 100%
  ), url(${img})`;
  }
  //   heroRef.style.backgroundImage = `linear-gradient(
  //   180deg,
  //   rgba(8, 15, 26, 0.59) 0%,
  //   rgba(17, 17, 46, 0.46) 100%
  // ), url(${img})`;
});
;
let selectedUnits = "";
const unitsBtns = document.querySelector(".degrees");
unitsBtns.addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-f")) {
    selectedUnits = "F";
  } else {
    selectedUnits = "C";
  }
  console.log(e.target.textContent);
  console.log(selectedUnits);
});
let map = L.map("map").setView([51.505, -0.09], 7);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const weatherElems = {
  cityTextEl: document.querySelector(".location__text"),
  dayOfWeekEl: document.querySelector("[data-date]"),
  dayNumEl: document.querySelector("[date-num]"),
  monthTextEl: document.querySelector("[data-month]"),
  timeTextEl: document.querySelector("[data-time]"),
  currentDegree: document.querySelector("[data-degree]"),
  currentWeatherIcon: document.querySelector(".hero__main-weather-ico"),
  currentStatus: document.querySelector("[data-current-status]"),
  feelsLikeEl: document.querySelector("[data-feels-like]"),
  windEl: document.querySelector("[data-wind]"),
  humidity: document.querySelector("[data-humidity]"),
  forecastBlocksRefs: document.querySelectorAll(".forecast-description-block"),
  firstDay: {
    firstDayOfWeekEl: document.querySelector("[data-first-day]"),
    firstDayOfWeekDegreeEl: document.querySelector("[data-first-degree]"),
    firstDayOfWeekIcon: document.querySelector("[data-first-day-ico]"),
  },
  secondDay: {
    secondDayOfWeekEl: document.querySelector("[data-second-day]"),
    secondDayOfWeekDegreeEl: document.querySelector("[data-second-degree]"),
    secondDayOfWeekIcon: document.querySelector("[data-second-day-ico]"),
  },
  thirdDay: {
    thirdDayOfWeekEl: document.querySelector("[data-third-day]"),
    thirdDayOfWeekDegreeEl: document.querySelector("[data-third-degree]"),
    thirdDayOfWeekIcon: document.querySelector("[data-third-day-ico]"),
  },
};

// console.log(weatherElems);

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

let mapMarker;
let mapCircle;

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
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput.value}&appid=9a6c5b632623b9a0c279060fc1b94b4d`
    )
      .then((resp) => resp.json())
      .then(function (data) {
        console.log(data);
        weatherElems.cityTextEl.textContent = `${data.name}, ${data.sys.country}`;
        let minutes = `${DateClass.getMinutes()}`;
        if (DateClass.getMinutes() < 10) {
          minutes = `0${DateClass.getMinutes()}`;
        }
        weatherElems.timeTextEl.textContent = `${DateClass.getHours()}:${minutes}`;
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
        weatherElems.currentStatus.textContent = data.weather[0].description;
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

        //? map

        if (mapMarker) {
          map.removeLayer(mapMarker);
          map.removeLayer(mapCircle);
        }

        mapMarker = L.marker([data.coord.lat, data.coord.lon]).addTo(map);
        mapCircle = L.circle([data.coord.lat, data.coord.lon], {
          radius: 10000,
        }).addTo(map);
        map.fitBounds(mapCircle.getBounds());

        document.querySelector(
          "[data-coords-lat]"
        ).textContent = `${data.coord.lat}`;
        document.querySelector(
          "[data-coords-lon]"
        ).textContent = `${data.coord.lon}`;

        //todo: next days

        fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=76c3cf13dc02402cacd153833232809&q=${data.name}&days=4&aqi=no&alerts=no`
        )
          .then((response) => response.json())
          .then((dataForecast) => {
            console.log(dataForecast);
            const fullWeekdayNames = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
            ];
            weatherElems.firstDay.firstDayOfWeekDegreeEl.textContent =
              dataForecast.forecast.forecastday[1].day.avgtemp_c.toFixed();
            weatherElems.secondDay.secondDayOfWeekDegreeEl.textContent =
              dataForecast.forecast.forecastday[2].day.avgtemp_c.toFixed();
            weatherElems.thirdDay.thirdDayOfWeekDegreeEl.textContent =
              dataForecast.forecast.forecastday[3].day.avgtemp_c.toFixed();

            //? days of week

            weatherElems.firstDay.firstDayOfWeekEl.textContent =
              fullWeekdayNames[DateClass.getDay() + 1];
            weatherElems.secondDay.secondDayOfWeekEl.textContent =
              fullWeekdayNames[DateClass.getDay() + 2];
            weatherElems.thirdDay.thirdDayOfWeekEl.textContent =
              fullWeekdayNames[DateClass.getDay() + 3];

            //# icons again...

            let allStatuses = [];
            fetch("https://www.weatherapi.com/docs/weather_conditions.json")
              .then((resp) => {
                return resp.json();
              })
              .then(function (dataIcons) {
                // console.log(dataIcons);
                allStatuses = dataIcons.map(({ day, night }) => {
                  if (day === night) {
                    return day;
                  } else {
                    return night;
                  }
                });
                allStatuses.push("Sunny");
                // console.log(allStatuses);
                // console.log(dataForecast);
                const allDaysElems = [
                  weatherElems.firstDay.firstDayOfWeekIcon,
                  weatherElems.secondDay.secondDayOfWeekIcon,
                  weatherElems.thirdDay.thirdDayOfWeekIcon,
                ];
                let acc = 0;
                allDaysElems.map((iconEl) => {
                  acc += 1;
                  let avgForecastWind =
                    dataForecast.forecast.forecastday[acc].day.maxwind_kph;
                  if (avgForecastWind % 3.6 === 0) {
                    avgForecastWind = (avgForecastWind / 3.6).toFixed();
                  } else {
                    avgForecastWind = (avgForecastWind / 3.6).toFixed(1);
                  }
                  weatherElems.forecastBlocksRefs[
                    acc - 1
                  ].innerHTML = `<h4 class="forecast-card__subtitle">${dataForecast.forecast.forecastday[acc].day.condition.text}</h4>
                  <p class="forecast__desc">wind: ${avgForecastWind} m/s</p>
                  <p class="forecast__desc">rain: ${dataForecast.forecast.forecastday[acc].day.daily_chance_of_rain}%</p>`;
                  // console.log(iconEl);
                  // console.log(acc);
                  // console.log(dataForecast.forecast.forecastday[acc]);

                  allStatuses.map((status) => {
                    if (
                      dataForecast.forecast.forecastday[acc].day.condition
                        .text === status
                    ) {
                      switch (
                        dataForecast.forecast.forecastday[acc].day.condition
                          .text
                      ) {
                        case "Sunny":
                          iconEl.src = "../img/icons/sun.png";
                          break;
                        case "Clear":
                          iconEl.src = "../img/icons/moon.png";
                          break;
                        case "Partly cloudy":
                          iconEl.src = "../img/icons/cloudsSunD.png";
                          break;
                        case "Cloudy":
                          iconEl.src = "../img/icons/twoclouds.png";
                          break;
                        case "Cloudy" &&
                          dataForecast.forecast.forecastday[acc].day
                            .maxwind_kph > 25:
                          iconEl.src = "../img/icons/cloudwind.png";
                          break;
                        case "Mist" || "Fog" || "Freezing fog":
                          iconEl.src = "../img/icons/cloudFog.png";
                          break;
                        case "Patchy rain possible" ||
                          "Patchy light drizzle" ||
                          "Light drizzle" ||
                          "Freezing drizzle" ||
                          "Patchy light rain" ||
                          "Light rain":
                          iconEl.src = "../img/icons/lightRain.png";
                          break;
                        case "Patchy snow possible" || "Patchy heavy snow":
                          iconEl.src = "../img/icons/cloud1snow.png";
                          break;
                        case "Patchy sleet possible" ||
                          "Patchy freezing drizzle possible" ||
                          "Light freezing rain" ||
                          "Light sleet" ||
                          "Ice pellets" ||
                          "Light showers of ice pellets" ||
                          "Moderate or heavy showers of ice pellets":
                          iconEl.src = "../img/icons/cloud90.png";
                          break;
                        case "Thundery outbreaks possible":
                          iconEl.src = "../img/icons/lightning.png";
                          break;
                        case "Blizzard":
                          iconEl.src = "../img/icons/cloudwind.png";
                          break;
                        case "Heavy freezing drizzle" ||
                          "Moderate rain at times" ||
                          "Moderate rain":
                          iconEl.src = "../img/icons/rains.png";
                          break;
                        case "Heavy rain at times":
                          iconEl.src = "../img/icons/cloudRainDeg.png";
                          break;
                        case "Heavy rain" ||
                          "Moderate or heavy freezing rain" ||
                          "Torrential rain shower":
                          iconEl.src = "../img/icons/cloud2rain.png";
                          break;
                        case "Moderate or heavy sleet" ||
                          "Heavy snow" ||
                          "Moderate or heavy sleet showers" ||
                          "Moderate or heavy snow showers":
                          iconEl.src = "../img/icons/cloudsnow.png";
                          break;
                        case "Patchy light snow" ||
                          "Light snow" ||
                          "Patchy moderate snow":
                          iconEl.src = "../img/icons/snow.png";
                          break;
                        case "Moderate snow" ||
                          "Light sleet showers" ||
                          "Light snow showers":
                          iconEl.src = "../img/icons/snows.png";
                          break;
                        case "Light rain shower" ||
                          "Moderate or heavy rain shower":
                          iconEl.src = "../img/icons/cloudrain90.png";
                          break;
                        case "Patchy light rain with thunder":
                          iconEl.src = "../img/icons/cloudTh.png";
                          break;
                        case "Moderate or heavy rain with thunder" ||
                          "Moderate or heavy snow with thunder":
                          iconEl.src = "../img/icons/cloudrainthunder.png";
                          break;
                        case "Patchy light snow with thunder":
                          iconEl.src = "../img/icons/drizzleThunder.png";
                          break;
                        default:
                          break;
                      }
                    }
                  });
                });
              });
          });
      })
      .catch(function (error) {
        console.log(error);
        errorTextEl.classList.remove("error-hidden");
        errorTextEl.textContent = "City not found";
      });
  }
});
;

