//For the base url we want to use the parameter &limit={limit} and q={city name},{state code},{country code}
// and units=imperial to get fahrenheit for temperture
//My API key d45477c23f64263ae329c1cedb3ece85

const apiKey = "d45477c23f64263ae329c1cedb3ece85";
const currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=lodi&units=imperial";
const fiveDayApi = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}units=imperial";

async function currentWeather(){
  const response = await fetch(currentApiUrl + `appid=${apiKey}`);
  var data = await response.json();

  console.log(data);
}