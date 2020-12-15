/*
This component is mainly responsible for data management via React
Context. On mount, it will simply fetch weather day (using our API module)
and then pass down the necessary data and handlers to children components
via context. The handlers give the children components an opportunity 
to update the data (eg. control form input and fire off new requests when
the user searches for another city).
*/

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
