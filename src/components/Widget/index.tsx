/*
This is the top most components found in the Weather Widget app.
It is responsible for rendering the wireframe and delivering config 
data to children components.
*/

import React from "react";

import WeatherConfig from "../WeatherConfig";
import WeatherContent from "../WeatherContent";

import { RootContainer } from "./styles";

const Widget = (): React.ReactElement => (
  <RootContainer>
    <WeatherConfig>
      <WeatherContent />
    </WeatherConfig>
  </RootContainer>
);

export default Widget;
