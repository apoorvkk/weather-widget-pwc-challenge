import axios from "axios";
import {
  WeatherResponseJsonInterface,
  ForecastResponseJsonInterface,
  ForcastDayResponseJsonInterface,
  WeatherDataInterface,
  WeatherDataDayInterface,
} from "./types";

const APP_ID = "2f2e50de44eb31e3a65e1d9d2acb2d44"; // Client key is always visible on the frontend.
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const formatWeatherData = (
  weatherData: WeatherResponseJsonInterface,
  forcastData: ForecastResponseJsonInterface
): WeatherDataInterface => {
  return {
    days: forcastData.daily.map(
      (dayData: ForcastDayResponseJsonInterface): WeatherDataDayInterface => {
        return {
          humidity: dayData.humidity,
          max: dayData.temp.max,
          min: dayData.temp.min,
          icon: dayData.weather[0]?.icon || "",
        };
      }
    ),
    currentTemp: weatherData.main.temp,
    pressure: weatherData.main.pressure,
    humidity: weatherData.main.humidity,
    cloudiness: weatherData.clouds.all,
    description: {
      headline: weatherData.weather[0]?.main || "",
      details: weatherData.weather[0]?.description || "",
      icon: weatherData.weather[0]?.icon || "",
    },
    visibility: weatherData.visibility,
    wind: {
      degree: weatherData.wind.deg,
      speed: weatherData.wind.speed * 3.6,
    },
  };
};

export const fetchWeatherData = async (
  location: string
): Promise<{ data: WeatherDataInterface; status: number }> => {
  const weatherResponse: {
    data: WeatherResponseJsonInterface;
    status: number;
  } = await axios.get(`${BASE_URL}weather`, {
    params: {
      q: location,
      APPID: APP_ID,
      units: "metric",
    },
  });

  if (weatherResponse.status !== 200) {
    return {
      status: weatherResponse.status,
      data: null,
    };
  }

  const lat = weatherResponse.data.coord.lat;
  const lon = weatherResponse.data.coord.lon;

  const forecastResponse: {
    data: ForecastResponseJsonInterface;
    status: number;
  } = await axios.get(`${BASE_URL}onecall`, {
    params: {
      lat,
      lon,
      exclude: "current,minutely,hourly",
      APPID: APP_ID,
      units: "metric",
    },
  });

  if (forecastResponse.status !== 200) {
    return {
      status: forecastResponse.status,
      data: null,
    };
  }

  return {
    status: 200,
    data: formatWeatherData(weatherResponse.data, forecastResponse.data),
  };
};
