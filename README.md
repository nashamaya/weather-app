# Nicha's Weather Forecast App

This weather forecast app is a React-based web application that allows users to search for a city of their choice, view the weather information fetched from the OpenWeather API, and save their favorite cities for quick access.

## Features

- Search for a city of your choice and view the current weather information and 3-day forecast.
- Save your favorite cities for quick access.
- View current weather information including temperature, humidity, wind speed, weather icon, and the local time.

## How to Run

1. Clone this repository to your local machine `https://github.com/nashamaya/weather-app.git`
2. Open the terminal and navigate to the project directory.
3. Create a .env file in the root directory and add the following:
   - VITE_APP_ID="Your_OpenWeather_API_Key"
   - If you don't have an API key, you can get one by signing up on [OpenWeather](https://openweathermap.org/)
4. Install the dependencies by running `npm install`.
5. Start the development server by running `npm run dev`.

## Technologies Used

- React
- Vite
- OpenWeather API
- LocalStorage for saving favorite cities locally
- Material UI for Icons and design
- CSS for styling
