import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    let apiKey = "49b631c45785fe73d2a88477803dea22";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (loaded) {
    return (
      <div>
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Enter a city.."
            value={city}
            onChange={updateCity}
          ></input>
          <button type="Submit">Search</button>
        </form>
        <h2>Weather in {city}.</h2>
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}℃</li>
          <li>Wind: {Math.round(weather.wind)}km/hr</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
          <li>Description: {weather.description}</li>
        </ul>
      </div>
    );
  } else
    return (
      <div>
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Enter a city.."
            value={city}
            onChange={updateCity}
          ></input>
          <button type="Submit">Search</button>
        </form>
      </div>
    );
}
