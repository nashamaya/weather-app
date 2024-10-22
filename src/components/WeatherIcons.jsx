import React from "react";
import sunnyday_icon from "../assets/sunnyday.png";
import clearnight_icon from "../assets/clearnight.png";
import showerday_icon from "../assets/showerday.png";
import showernight_icon from "../assets/showernight.png";
import rainyday_icon from "../assets/rainy.png";
import rainynight_icon from "../assets/rainy.png";
import snowyday_icon from "../assets/snowyday.png";
import snowynight_icon from "../assets/snowynight.png";
import thunderstormday_icon from "../assets/thunderstormday.png";
import thunderstormnight_icon from "../assets/thunderstormnight.png";
import foggyday_icon from "../assets/foggyday.png";
import foggynight_icon from "../assets/foggyday.png";
import partialcloudyday_icon from "../assets/partialcloudyday.png";
import partialcloudynight_icon from "../assets/partialcloudynight.png";
import noiconavailable_icon from "../assets/noiconavailable.png";

const weatherIcons = {
    "01d": sunnyday_icon,
    "01n": clearnight_icon,
    "02d": partialcloudyday_icon,
    "02n": partialcloudynight_icon,
    "03d": partialcloudyday_icon,
    "03n": partialcloudynight_icon,
    "04d": partialcloudyday_icon,
    "04n": partialcloudynight_icon,
    "09d": showerday_icon,
    "09n": showernight_icon,
    "10d": rainyday_icon,
    "10n": rainynight_icon,
    "11d": thunderstormday_icon,
    "11n": thunderstormnight_icon,
    "13d": snowyday_icon,
    "13n": snowynight_icon,
    "50d": foggyday_icon,
    "50n": foggynight_icon,
  };

  const WeatherIcons = ({iconCode}) => {
  const icon = weatherIcons[iconCode] || noiconavailable_icon;

  return <img src={icon} alt="weather icon" className="weather-icon" />;
};

export default WeatherIcons;
