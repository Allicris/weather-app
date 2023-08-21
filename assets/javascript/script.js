//For the base url we want to use the parameter &limit={limit} and q={city name},{state code},{country code}

const apiKey = "d45477c23f64263ae329c1cedb3ece85";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
//const fiveDayApi = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}units=imperial";
const searchCity = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const savedSearches = [];

// var today = moment();
// let dateFormat = moment().format('D-MM-YYYY');
// console.log(dateFormat1); // 23-08-2022

searchBtn.addEventListener("click", () => {
  currentWeather(searchCity.value);
  document.querySelector(".search p").style.display = "none";
  document.querySelector(".weather").style.display = "block";
});

async function currentWeather(city) {
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

  const response = await fetch(apiUrl);
  var data = await response.json();

  if (response.status == 404) {
    document.querySelector(".search p").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }

  console.log(data);

  // document.querySelector('.date').innerHTML = "";
  document.querySelector('.city').innerHTML = data.name;
  //This needs to be rounded up.
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + " " + "°";
  document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + " " + "mph/hr";
  document.querySelector('.humidity').innerHTML = "Humidity" + " " + Math.round(data.main.humidity);

  if (data.weather[0].main == 'Clouds') {
    weatherIcon.src = "assets/images/cloudy.png";
  } else if (data.weather[0].main == 'Clear') {
    weatherIcon.src = "assets/images/sunny.png";
  } else if (data.weather[0].main == 'Rain') {
    weatherIcon.src = "assets/images/rainy.png";
  } else if (data.weather[0].main == 'Snow') {
    weatherIcon.src = "assets/images/snow.png";
  }

  getFiveDay();
}

async function getFiveDay() {
  const searchCity = document.querySelector(".search input");
  //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key})
  const fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity.value + "&appid=" + apiKey +
  "&units=imperial";
  const response = await fetch(fiveDayUrl);
  if(!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  
  if(!data || !data.list || data.list.length === 0) {
    console.log('Invalid or empty data received from the API');
    return;
  }

const tempElements = document.querySelectorAll(".tempy");
const windyElements = document.querySelectorAll(".windy");
const humidElements = document.querySelectorAll('.humid');

    for (i = 0; i < Math.min(5, data.list.length); i++) {
      tempElements[i].innerHTML = Math.round(data.list[i].main.temp) + " " + "°";
      windyElements[i].innerHTML = Math.round(data.list[i].wind.speed) + " " + "mph/hr";
      humidElements[i].innerHTML = "Humidity" + " " + Math.round(data.list[i].main.humidity);
    }
  }

// searchBtn.addEventListener("click", () => {
//   currentWeather(searchCity.value);
//   document.querySelector(".search p").style.display = "none";
//   document.querySelector(".weather").style.display = "block";
// });

getFiveDay();
currentWeather();