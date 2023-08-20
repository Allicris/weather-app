//For the base url we want to use the parameter &limit={limit} and q={city name},{state code},{country code}

const apiKey = "d45477c23f64263ae329c1cedb3ece85";
const currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
//const fiveDayApi = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}units=imperial";
const searchCity = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function currentWeather(city){
  const response = await fetch(currentApiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  if(response.status == 404) {
    document.querySelector.apply(".error").style.display = "block"
  }

  console.log(data);

  // document.querySelector('.date').innerHTML = "";
  document.querySelector('.city').innerHTML = data.name;
  //This needs to be rounded up.
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + " " + "°";
  document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + " " + "mph/hr";
  document.querySelector('.humidity').innerHTML = Math.round(data.main.humidity);

  if(data.weather[0].main == 'Clouds') {
    weatherIcon.src = "assets/images/cloudy.png";
  } else if (data.weather[0].main == 'Clear') {
    weatherIcon.src = "assets/images/sunny.png";
  } else if (data.weather[0].main == 'Rain') {
    weatherIcon.src = "assets/images/rainy.png";
  } else if (data.weather[0].main == 'Snow'){
    weatherIcon.src = "assets/images/snow.png";
  }

}

searchBtn.addEventListener("click", () => {

currentWeather(searchCity.value);
});

currentWeather();