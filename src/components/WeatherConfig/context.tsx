import React, { useContext } from "react";
import { WeatherConfigContextInterface } from "./types";

export const WeatherConfigContext = React.createContext<WeatherConfigContextInterface>(
  {
    isLoading: false,
    isImperial: false,
    location: "",
    weatherData: null,
    weatherDataStatus: NaN,
    setIsImperial: () => {},
    setLocation: () => {},
    refreshWidget: async () => {},
  }
);

export const useWeatherConfig = (): WeatherConfigContextInterface =>
  useContext<WeatherConfigContextInterface>(WeatherConfigContext);
