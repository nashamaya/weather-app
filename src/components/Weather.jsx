import React, { useEffect, useState, useRef } from "react";
import { getLocalTime } from "./getLocalTime";
import "./Weather.css";
import search_icon from "../assets/searchicon.png";
import humidity_icon from "../assets/humidity.png";
import windy_icon from "../assets/windy.png";
import WeatherIcons from "./WeatherIcons";
import StarIcon from "@mui/icons-material/Star";

const Weather = () => {
  const searchInputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(false); // current weather data fetched from API
  const [forecastData, setForecastData] = useState([]); // to store 3 day forecast data fetched from API
  const [favoriteCities, setFavoriteCities] = useState([]); // to store favorite cities

  // fetch current weather and 3 day forecast data from API
  const fetchWeather = async (city) => {
    if (city === "") {
      // if city name is empty, alert user
      alert("Please enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`; // current weather

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric&cnt=3`; // 3 day forecast

      const response = await fetch(url); // current weather
      const forecastResponse = await fetch(forecastUrl); // 3 day forecast

      if (!response.ok || !forecastResponse.ok) {
        // if city is not found or API error, alert user
        alert("City is not found or API error");
        throw new Error("City is not found or API error");
      }
      const data = await response.json(); // current weather data
      const forecastData = await forecastResponse.json(); // 3 day forecast data

      setWeatherData({
        // set current weather data to state
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        iconCode: data.weather[0].icon,
        timezone: data.timezone,
      });

      const processedForecastData = forecastData.list.map((day, index) => {
        // process 3 day forecast data, set to get 3 target days
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const targetHours = index === 0 ? 0 : index === 1 ? 24 : 48;
        const targetDate = new Date(
          tomorrow.getTime() + targetHours * 60 * 60 * 1000
        );
        console.log(
          `Mapping check: Array ${index}, Date: ${targetDate.toLocaleString()}, Data:`,
          day
        );
        return { ...day, targetDate }; // Return the day object with targetDate added
      });

      setForecastData(processedForecastData);
      console.log("Processed forecast data:", processedForecastData); // check to see if 3 target days are processed
    } catch (error) {
      console.log("Error fetching weather data", error);
    }
  };

  useEffect(() => {
    // On component mount, check and get previously saved favorite cities and update the favoriteCities state
    const storedCities =
      JSON.parse(localStorage.getItem("favoriteCities")) || [];
    setFavoriteCities(storedCities);
  }, []);

  const AddFavoriteCity = () => {
    // add current city to favorite cities
    if (!weatherData) return;
    const cityName = weatherData.city;

    if (favoriteCities.includes(cityName)) {
      // if city is already in favorite cities, alert user
      alert(`${cityName} is already in your favorites!`);
      return;
    }

    const updatedCities = [...favoriteCities, cityName]; // update favorite cities state and save to local storage
    setFavoriteCities(updatedCities);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedCities));
    alert(`${cityName} is added to your favorites!`); // let user know that the city is successfully added into favorite cities
  };

  useEffect(() => {
    // On component mount, fetch current weather data for Vancouver
    fetchWeather("Vancouver");
  }, []);

  return (
    <div className="weather-container">
      <div className="weather">
        <div className="search-bar">
          <input type="text" placeholder="Search City" ref={searchInputRef} />
          <img
            src={search_icon}
            alt=""
            onClick={() => fetchWeather(searchInputRef.current.value)}
          />
        </div>
        {weatherData ? (
          <>
            <br />
            <p className="city">{weatherData.city}</p>
            <p className="local-time">
              Local Time: {getLocalTime(weatherData.timezone)}
            </p>
            <br />
            <WeatherIcons iconCode={weatherData.iconCode} />
            <p className="temperature">{weatherData.temperature}°c</p>
            <p className="description">{weatherData.description}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <p>
                    <span>Humidity</span>
                  </p>
                </div>
              </div>
              <div className="col">
                <img src={windy_icon} alt="" />
                <div>
                  <p>{weatherData.windSpeed} km/hr</p>
                  <p>
                    <span>wind speed</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="forecast-container">
        <div
          className="favorite-container"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <StarIcon
            sx={{
              cursor: "pointer",
              color:
                weatherData && favoriteCities.includes(weatherData.city)
                  ? "green"
                  : "orange",
              fontSize: "30px",
            }}
            onClick={AddFavoriteCity}
          />
          <span style={{ marginLeft: "10px", fontSize: "16px", color: "#333" }}>
            Add this city to favorites
          </span>
        </div>
        <p
          style={{
            marginLeft: "50px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#4a148c",
          }}
        >
          3-Day Forecast
        </p>
        {forecastData.length > 0 ? (
          forecastData.map((day, index) => (
            <div key={index} className="forecast">
              <p>
                {day.targetDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>{Math.floor(day.main.temp)}°c</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))
        ) : (
          <p>No forecast data available</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
