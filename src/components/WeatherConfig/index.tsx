import React, { useEffect, useState } from "react";

import { WeatherDataInterface } from "./types";
import { WeatherConfigContext } from "./context";
import { fetchWeatherData } from "./apis";

const WeatherConfig = (props: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isImperial, setIsImperial] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("Melbourne, AU");
  const [weatherData, setWeatherData] = useState<WeatherDataInterface>(null);
  const [weatherDataStatus, setWeatherDataStatus] = useState<number>(NaN);
  const refreshWidget = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const weatherResponse = await fetchWeatherData(location);

      setWeatherDataStatus(weatherResponse.status);

      if (weatherResponse.status === 200) {
        setWeatherData(weatherResponse.data);
      }
    } catch (error) {
      setWeatherDataStatus(error?.response?.status || 500);
    }
    setIsLoading(false);
  };
  const configContext = {
    isLoading,
    isImperial,
    location,
    weatherData,
    weatherDataStatus,
    setIsImperial,
    setLocation,
    refreshWidget,
  };

  useEffect(() => {
    refreshWidget();
  }, []);

  return (
    <WeatherConfigContext.Provider value={configContext}>
      {props.children}
    </WeatherConfigContext.Provider>
  );
};

export default WeatherConfig;
