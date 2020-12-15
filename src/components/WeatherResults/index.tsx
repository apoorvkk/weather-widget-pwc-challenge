/*
This component is responsible for rendering the weather data under the form controls.
For example, it will render the current day's weather data (temp, humidity, pressure etc.)
and the forecasted weather for the upcoming week.
*/

import React from "react";
import dayjs from "dayjs";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useWeatherConfig } from "../WeatherConfig/context";
import {
  ForecastWeekContainer,
  ForecastDayContainer,
  WeatherIconContainer,
} from "./styles";

const getWindDirection = (degree: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  return directions[Math.floor(degree / 45)];
};

const convertToFahrenheit = (c: number): number => (9 * c + 32 * 5) / 5;

const WeatherResults = (): React.ReactElement => {
  const {
    weatherData,
    isLoading,
    weatherDataStatus,
    isImperial,
  } = useWeatherConfig();

  if (weatherDataStatus !== 200 || isLoading) {
    return null;
  }

  const headline = weatherData.description.headline;
  const details = weatherData.description.details;
  const icon = weatherData.description.icon;
  const visibility = weatherData.visibility;
  const humidity = weatherData.humidity;
  const pressure = weatherData.pressure;
  const cloudiness = weatherData.cloudiness;
  const windSpeed = !isImperial
    ? weatherData.wind.speed
    : weatherData.wind.speed * 0.6214;
  const formattedWindSpeed = Number(windSpeed).toFixed(2);
  const windDirection = getWindDirection(weatherData.wind.degree);
  const windUnits = !isImperial ? "kph" : "mph";
  const currentTemp = !isImperial
    ? weatherData.currentTemp
    : convertToFahrenheit(weatherData.currentTemp);
  const tempUnits = !isImperial ? "C" : "F";

  return (
    <>
      <Row>
        <Col>
          <div>{dayjs().format("dddd, MMMM Do")}</div>
          <div>{headline}</div>
          <div>{details.charAt(0).toUpperCase() + details.slice(1)}</div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Row>
            <WeatherIconContainer>
              <img
                alt="A picture of what the current weather is like."
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              />
            </WeatherIconContainer>
            <Col className="align-self-center">
              <h1>
                {Math.round(currentTemp)}&#176;{tempUnits}
              </h1>
            </Col>
          </Row>
        </Col>
        <Col>
          <ul>
            <li>{`Visibility: ${visibility} metres`}</li>
            <li>{`Humidity: ${humidity}%`}</li>
            <li>{`Wind: ${formattedWindSpeed} ${windUnits} ${windDirection}`}</li>
            <li>{`Pressure: ${pressure} hPa`}</li>
            <li>{`Cloudiness: ${cloudiness}%`}</li>
          </ul>
        </Col>
      </Row>

      <ForecastWeekContainer className="justify-content-center">
        {weatherData.days.slice(0, 7).map((dayData, i) => {
          let day = dayjs().add(i, "day").format("dddd");
          if (day === dayjs().format("dddd")) {
            day = "Today";
          }
          const minTemp = !isImperial
            ? dayData.min
            : convertToFahrenheit(dayData.min);
          const maxTemp = !isImperial
            ? dayData.max
            : convertToFahrenheit(dayData.max);
          const humidity = dayData.humidity;

          return (
            <ForecastDayContainer key={i}>
              <Row className="justify-content-center">{day}</Row>

              <Row className="justify-content-center">
                <img
                  src={`http://openweathermap.org/img/wn/${dayData.icon}@2x.png`}
                  alt={`A picture of what the forecasted weather is like on ${day}.`}
                />
              </Row>

              <Row className="justify-content-center">
                <span>{Math.round(maxTemp)}&#176;&nbsp;</span>
                <span className="text-muted">{Math.round(minTemp)}&#176;</span>
              </Row>
              <Row className="justify-content-center">
                <small className="text-muted">Humidity {humidity}%</small>
              </Row>
            </ForecastDayContainer>
          );
        })}
      </ForecastWeekContainer>
    </>
  );
};

export default WeatherResults;
