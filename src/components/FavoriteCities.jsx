import React, { useEffect, useState } from "react";
import { getLocalTime } from "./getLocalTime";
import "./FavoriteCities.css";
import humidity_icon from "../assets/humidity.png";
import windy_icon from "../assets/windy.png";
import WeatherIcons from "./WeatherIcons";
import StarIcon from "@mui/icons-material/Star";

const FavoriteCities = () => {
  // Stores the list of cities saved as favorites, retrieved from localStorage
  const [favoriteCities, setFavoriteCities] = useState([]); // to store favorite cities
  const [weatherDataList, setWeatherDataList] = useState([]); // to store current weather data for favorite cities
  console.log("reading from this:", weatherDataList);

  useEffect(() => {
    // Load favorite cities from local storage
    const storedCities =
      JSON.parse(localStorage.getItem("favoriteCities")) || []; // if no previously saved favorite cities are found, it defaults to anempty array
    setFavoriteCities(storedCities);
  }, []);

  useEffect(() => {
    // Fetch current weather data for favorite cities
    if (favoriteCities.length > 0) {
      // if there are favorite cities, fetch current weather data for each city by calling fetchWeatherForFavoriteCities
      fetchWeatherForFavoriteCities();
    }
  }, [favoriteCities]); // re-fetch current weather data when favorite cities change

  const fetchWeatherForCity = async (city) => {
    // this function takes a city name as input and fetches current weather data from the OpenWeatherMap API
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${city} not found`);
      }
      const data = await response.json();
      console.log(data);

      return {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        iconCode: data.weather[0].icon,
        timezone: data.timezone,
      };
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
    }
  };

  const fetchWeatherForFavoriteCities = async () => {
    // this function iterates through each city in the favoriteCities array
    const weatherDataPromises = favoriteCities.map(
      (
        city // and fetch its weather data by calling fetchWeatherForCity
      ) => fetchWeatherForCity(city)
    );
    const weatherData = await Promise.all(weatherDataPromises); // the result data is stored in weatherDataList state
    setWeatherDataList(weatherData.filter((data) => data));
  };
  console.log("favoriteCities:", favoriteCities);

  const removeFavoriteCity = (cityName) => {
    // this function removes a city from the favoriteCities array
    const updatedCities = favoriteCities.filter((city) => city !== cityName); // filter out the selected city from the favoriteCities array
    setFavoriteCities(updatedCities);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedCities)); // update local storage with the new list of favorite cities
  };

  return (
    <div className="favorite-cities-container">
      {weatherDataList.length > 0 ? (
        weatherDataList.map((weatherData, index) => (
          <div className="weather" key={index}>
            <p className="city">{weatherData.city}</p>
            <p className="local-time">
              Local Time: {getLocalTime(weatherData.timezone)}
            </p>
            <br />
            <div
              className="remove-favorite-container"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StarIcon
                sx={{
                  cursor: "pointer",
                  color: "gold",
                  fontSize: "20px",
                }}
                onClick={() => removeFavoriteCity(weatherData.city)}
              />
              <span
                style={{
                  marginLeft: "10px",
                  fontSize: "14px",
                  color: "#f48fb1",
                }}
              >
                Remove from favorites
              </span>
            </div>
            <br />
            <WeatherIcons iconCode={weatherData.iconCode} />
            <br />
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
                <img src={windy_icon} alt="Wind Speed" />
                <div>
                  <p>{weatherData.windSpeed} km/hr</p>
                  <p>
                    <span>wind speed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>There is no favorite cities added yet</p>
      )}
    </div>
  );
};

export default FavoriteCities;
