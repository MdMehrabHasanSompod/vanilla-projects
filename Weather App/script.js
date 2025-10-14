const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "f00c38e0279b7bc85480c3fe775d518c";

const cityName = document.querySelector("#city-name");
const date = document.querySelector("#date");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const windSpeed = document.querySelector("#wind-speed");
const lon = document.querySelector("#lon");
const lat = document.querySelector("#lat");
const visibility = document.querySelector("#visibility");
const minTemp = document.querySelector("#minTemp");
const maxTemp = document.querySelector("#maxTemp");
const airPressure = document.querySelector("#air-pressure");
const humidity = document.querySelector("#humidity");
const cloudTotal = document.querySelector("#cloudTotal");
let data;

const fetchWeatherByCoords = async (lat, lon) => {
  const tempDetails = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(tempDetails);
    data = await res.json();
    if (res.ok) {
      setWeather(data);
    } else {
      alert("Weather Fetching Failed");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    },
    () => {
      alert("Allow location");
    }
  );
} else {
  weatherFunc("New York");
}

document.querySelector(".city-weather-button").addEventListener("click", () => {
  const city = document.querySelector("#city-input").value.trim();
  if (!city) {
    alert("Please enter a city!");
    return;
  }
  weatherFunc(city);
});

const weatherFunc = async (cityName) => {
  const tempDetails = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(tempDetails);
    data = await res.json();
    if (res.ok) {
      setWeather(data);
    } else {
      alert("City name not found. Please try again");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const setWeather = (data) => {
  const countryCode = data.sys.country;
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const countryName = regionNames.of(countryCode);
  cityName.textContent = `${data.name}, ${countryName}`;

  const dt = data.dt;
  const timezone = data.timezone;
  date.textContent = updateLocalTime(dt, timezone);

  temperature.textContent = `${data.main.temp}°C`;
  minTemp.textContent = `MIN: ${data.main.temp_min}°C`;
  maxTemp.textContent = `MAX: ${data.main.temp_max}°C`;
  description.textContent = data.weather[0].description;
  windSpeed.textContent = `wind-speed: ${data.wind.speed}m/s`;

  const imageUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherImg.src = imageUrl;
  lon.textContent = convertLonToDMS(data.coord.lon);
  lat.textContent = convertLatToDMS(data.coord.lat);
  visibility.textContent = `Visibility: ${data.visibility}`;
  airPressure.textContent = `Air Pressure: ${data.main.pressure}`;
  humidity.textContent = `Humidity: ${data.main.humidity}`;
  cloudTotal.textContent = `Cloud Coverage: ${data.clouds.all}%`;
};

const updateLocalTime = (dt, timezone) => {
  const now = Date.now();
  const apiTime = dt * 1000;
  const elapsed = now - apiTime;
  const currentMumbaiTime = new Date(apiTime + elapsed + timezone * 1000);
  return currentMumbaiTime.toUTCString();
};

const convertLatToDMS = (lat) => {
  const latDeg = Math.floor(Math.abs(lat));
  const latMin = Math.floor((Math.abs(lat) - latDeg) * 60);
  const latSec = ((Math.abs(lat) - latDeg) * 60 - latMin) * 60;
  const latDir = lat >= 0 ? "N" : "S";
  return `${latDeg}°${latMin}'${latSec.toFixed(2)}"${latDir}`;
};

const convertLonToDMS = (lon) => {
  const lonDeg = Math.floor(Math.abs(lon));
  const lonMin = Math.floor((Math.abs(lon) - lonDeg) * 60);
  const lonSec = ((Math.abs(lon) - lonDeg) * 60 - lonMin) * 60;
  const lonDir = lon >= 0 ? "E" : "W";
  return `${lonDeg}°${lonMin}'${lonSec.toFixed(2)}"${lonDir},`;
};
