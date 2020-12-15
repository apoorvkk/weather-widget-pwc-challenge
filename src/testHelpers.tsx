import React from "react";

import { render, RenderResult } from "@testing-library/react";
import _ from "lodash";
import axios from "axios";

import { weatherDataJson, forecastDataJson } from "./testData";
import { WeatherConfigContext } from "./components/WeatherConfig/context";

const defaultWeatherData = {
  days: [
    {
      humidity: 10,
      max: 40,
      min: 0,
      icon: "10e",
    },
    {
      humidity: 0,
      max: 60,
      min: 34,
      icon: "ee45",
    },
  ],
  currentTemp: 23.7,
  pressure: 10034,
  humidity: 89,
  cloudiness: 25,
  visibility: 1000,
  description: {
    headline: "Cloudy",
    details: "35% chain of rain",
    icon: "10d",
  },
  wind: {
    degree: 315,
    speed: 23,
  },
};
export const renderWithWeatherConfig = (
  ui: React.ReactElement,
  configOverrides = {}
): RenderResult => {
  const config = _.merge(
    {
      isLoading: false,
      isImperial: false,
      location: "",
      weatherData: defaultWeatherData,
      weatherDataStatus: 200,
      setIsImperial: () => {},
      setLocation: () => {},
      refreshWidget: async () => {},
    },
    configOverrides
  );

  return render(
    <WeatherConfigContext.Provider value={config}>
      {ui}
    </WeatherConfigContext.Provider>
  );
};

export const mockApiRequests = (
  weatherData = weatherDataJson,
  forecastData = forecastDataJson
): void => {
  (axios.get as jest.Mock) = jest.fn((url) => {
    if (url === "https://api.openweathermap.org/data/2.5/weather") {
      return Promise.resolve({
        status: 200,
        data: weatherData,
      });
    } else if (url === "https://api.openweathermap.org/data/2.5/onecall") {
      return Promise.resolve({
        status: 200,
        data: forecastData,
      });
    }
  });
};
