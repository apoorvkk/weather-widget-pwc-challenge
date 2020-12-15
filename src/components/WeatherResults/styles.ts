import styled from "styled-components";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const WeatherIconContainer = styled(Col)`
  flex-grow: 0;
`;

const ForecastDayContainer = styled(Col)`
  flex-grow: 0;
  margin-left: 10px;
  margin-right: 10px;
`;

const ForecastWeekContainer = styled(Row)`
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  border-top: 1px solid #0000001f;
`;

export { ForecastWeekContainer, ForecastDayContainer, WeatherIconContainer };
