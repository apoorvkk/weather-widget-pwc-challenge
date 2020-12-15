/*
This component is responsible for rendering the full content of the widget
which includes the controls (location input and imperial toggle) and the
weather results page. Because it renders the full content, I also manage 
loading/error UI states here too.
*/

import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import WeatherResults from "../WeatherResults";
import { useWeatherConfig } from "../WeatherConfig/context";

import {
  StagingContainer,
  Spinner,
  LocationRow,
  SwitchContainer,
} from "./styles";

const getErrorMessage = (status: number): string => {
  if (status === 404) {
    return "City not found. Please enter text in this format: City,Country code (eg. Melbourne,AU)";
  }
  return "Something went wrong. Give it a moment and try again.";
};

const WeatherContent = (): React.ReactElement => {
  const {
    location,
    isLoading,
    weatherDataStatus,
    isImperial,
    setIsImperial,
    setLocation,
    refreshWidget,
  } = useWeatherConfig();
  const isError = !isLoading && weatherDataStatus !== 200;

  return (
    <>
      <LocationRow>
        <Col>
          <TextField
            label="Location"
            value={location}
            inputProps={{
              style: { fontSize: 40, color: "black" },
            }}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await refreshWidget();
              }
            }}
          />
        </Col>
        <SwitchContainer>
          <FormControlLabel
            control={
              <Switch
                checked={isImperial}
                onChange={(e) => setIsImperial(e.target.checked)}
                color="primary"
                inputProps={{
                  "aria-label": "Switch between metric and imperial units",
                }}
              />
            }
            label="Imperial"
          />
        </SwitchContainer>
      </LocationRow>
      <WeatherResults />
      {isLoading && (
        <Row>
          <StagingContainer>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </StagingContainer>
        </Row>
      )}
      {!isLoading && isError && (
        <Row>
          <StagingContainer>
            {getErrorMessage(weatherDataStatus)}
          </StagingContainer>
        </Row>
      )}
    </>
  );
};

export default WeatherContent;
