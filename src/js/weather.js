let cityName = "";
document.querySelector(".search__btn").addEventListener("click", function (e) {
  e.preventDefault;
    cityName = document.querySelector(".search__input").value;
    return cityName;
//   console.log(cityName);
});
console.log(cityName);
// const APIkey = "9a6c5b632623b9a0c279060fc1b94b4d";
// const apiLink = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=9a6c5b632623b9a0c279060fc1b94b4d`;

// async function checkWeather() {
//   const response = await fetch(apiLink);
//   const data = await response.json();
//     console.log(data, "data");

//     // document.querySelector("[]")
// }

// checkWeather();
