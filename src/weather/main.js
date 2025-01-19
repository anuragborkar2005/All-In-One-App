// Select DOM Elements
const cityName = document.getElementById("city-name");
const searchCity = document.getElementById("search-city");
const dateTime = document.getElementById("date-time");
const weatherStatus = document.getElementById("status");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windI = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// Fetching Weather Data
let city = "pune";

searchCity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    city = searchCity.value.toLowerCase();
    getWeatherData();
    searchCity.value = "";
  }
});
const WEATHER_API_KEY = "5b807478137db8f2f290767fc69c3059";
let region = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

function getDateFormat() {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
}

async function getWeatherData() {
  const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${WEATHER_API_KEY}`;
  try {
    const response = await fetch(cityUrl);
    const data = await response.json();
    console.log(data);
    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${region(sys.country)}`;
    weatherStatus.innerHTML = weather[0].main;
    icon.innerHTML = `<img class="w-36 h-auto" src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
    dateTime.innerHTML = getDateFormat();
    temp.innerHTML = `${main.temp.toFixed()}°F`;
    minTemp.innerHTML = `Min: ${main.temp_min.toFixed()}°F`;
    maxTemp.innerHTML = `Max: ${main.temp_max.toFixed()}°F`;
    feelsLike.innerHTML = `${main.feels_like.toFixed()}°F`;
    humidity.innerHTML = `${main.humidity.toFixed()}%`;
    windI.innerHTML = `${(wind.speed * 2.237).toFixed(1)} mph`; // Convert m/s to mph
    pressure.innerHTML = `${main.pressure.toFixed()} Pa`;
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", getWeatherData);
