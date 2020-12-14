import React from "react";
import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StyledContainer = styled(Container)`
  border: 1px solid #00000017;
  border-radius: 14px;
  box-shadow: 10px;
  box-shadow: 4px 4px 12px -2px #9191a9;
`;

const WeatherIconContainer = styled(Col)`
  flex-grow: 0;
`;

const ForecastDayContainer = styled(Col)`
  flex-grow: 0;
`;

const ForecastWeekContainer = styled(Row)`
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  border-top: 1px solid #0000001f;
`;

const Widget = (): React.ReactElement => (
  <>
    <StyledContainer>
      <Row>
        <Col>
          <h1>Sydney</h1>
          <div>Tuesday, April 15th</div>
          <div>Overcast</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <WeatherIconContainer>
              <img src="http://openweathermap.org/img/wn/04n@2x.png" />
            </WeatherIconContainer>
            <Col className="align-self-center">
              <h1>18&#176;C</h1>
            </Col>
          </Row>
        </Col>
        <Col>
          <ul>
            <li>Precipitation: 100%</li>
            <li>Humidity: 100%</li>
            <li>Wind: 4kph SW</li>
            <li>Pressure: 1018 hPa</li>
          </ul>
        </Col>
      </Row>
      <ForecastWeekContainer className="justify-content-center">
        <ForecastDayContainer>
          <Row className="justify-content-center">Today</Row>

          <Row className="justify-content-center">
            <img src="http://openweathermap.org/img/wn/04n@2x.png" />
          </Row>

          <Row className="justify-content-center">18&#176;C 18&#176;C</Row>
        </ForecastDayContainer>

        <ForecastDayContainer>
          <Row className="justify-content-center">Today</Row>

          <Row className="justify-content-center">
            <img src="http://openweathermap.org/img/wn/04n@2x.png" />
          </Row>

          <Row className="justify-content-center">18&#176;C 18&#176;C</Row>
        </ForecastDayContainer>

        <ForecastDayContainer>
          <Row className="justify-content-center">Today</Row>

          <Row className="justify-content-center">
            <img src="http://openweathermap.org/img/wn/04n@2x.png" />
          </Row>

          <Row className="justify-content-center">18&#176;C 18&#176;C</Row>
        </ForecastDayContainer>

        <ForecastDayContainer>
          <Row className="justify-content-center">Today</Row>

          <Row className="justify-content-center">
            <img src="http://openweathermap.org/img/wn/04n@2x.png" />
          </Row>

          <Row className="justify-content-center">18&#176;C 18&#176;C</Row>
        </ForecastDayContainer>

        <ForecastDayContainer>
          <Row className="justify-content-center">Today</Row>

          <Row className="justify-content-center">
            <img src="http://openweathermap.org/img/wn/04n@2x.png" />
          </Row>

          <Row className="justify-content-center">18&#176;C 18&#176;C</Row>
        </ForecastDayContainer>

        <ForecastDayContainer>
          <Row className="justify-content-center">Today</Row>

          <Row className="justify-content-center">
            <img src="http://openweathermap.org/img/wn/04n@2x.png" />
          </Row>

          <Row className="justify-content-center">18&#176;C 18&#176;C</Row>
        </ForecastDayContainer>

        <ForecastDayContainer>
          <Row className="justify-content-center">Today</Row>

          <Row className="justify-content-center">
            <img src="http://openweathermap.org/img/wn/04n@2x.png" />
          </Row>

          <Row className="justify-content-center">18&#176;C 18&#176;C</Row>
        </ForecastDayContainer>
      </ForecastWeekContainer>
    </StyledContainer>
  </>
);

export default Widget;
