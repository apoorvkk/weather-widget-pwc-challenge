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
