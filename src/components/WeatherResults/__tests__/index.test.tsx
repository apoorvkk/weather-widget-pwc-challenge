import React from "react";

import dayjs from "dayjs";

import { renderWithWeatherConfig } from "../../../testHelpers";

import WeatherResults from "../";

describe("when status is 404", () => {
  it("does not render any content", () => {
    const { container } = renderWithWeatherConfig(<WeatherResults />, {
      weatherDataStatus: 404,
    });

    expect(container).toMatchSnapshot();
  });
});

describe("when status is 500", () => {
  it("does not render any content", () => {
    const { container } = renderWithWeatherConfig(<WeatherResults />, {
      weatherDataStatus: 500,
    });

    expect(container).toMatchSnapshot();
  });
});

describe("when loading", () => {
  it("does not render any content", () => {
    const { container } = renderWithWeatherConfig(<WeatherResults />, {
      isLoading: true,
    });

    expect(container).toMatchSnapshot();
  });
});

describe("when results loaded successfully", () => {
  const testContent = (isImperial = false) => {
    const { queryByText, getByAltText } = renderWithWeatherConfig(
      <WeatherResults />,
      {
        isImperial,
      }
    );
    const nextDay = dayjs().add(1, "day").format("dddd");

    if (!isImperial) {
      expect(queryByText("24°C")).toBeInTheDocument();
      expect(queryByText("Wind: 23.00 kph NW")).toBeInTheDocument();
      expect(queryByText("40°")).toBeInTheDocument();
      expect(queryByText("0°")).toBeInTheDocument();
      expect(queryByText("60°")).toBeInTheDocument();
      expect(queryByText("34°")).toBeInTheDocument();
    } else {
      expect(queryByText("75°F")).toBeInTheDocument();
      expect(queryByText("Wind: 14.29 mph NW")).toBeInTheDocument();
      expect(queryByText("104°")).toBeInTheDocument();
      expect(queryByText("32°")).toBeInTheDocument();
      expect(queryByText("140°")).toBeInTheDocument();
      expect(queryByText("93°")).toBeInTheDocument();
    }

    expect(queryByText(dayjs().format("dddd, MMMM Do"))).toBeInTheDocument();
    expect(queryByText("Cloudy")).toBeInTheDocument();
    expect(queryByText("35% chain of rain")).toBeInTheDocument();
    expect(queryByText("Visibility: 1000 metres")).toBeInTheDocument();
    expect(queryByText("Humidity: 89%")).toBeInTheDocument();
    expect(queryByText("Pressure: 10034 hPa")).toBeInTheDocument();
    expect(queryByText("Cloudiness: 25%")).toBeInTheDocument();
    expect(
      getByAltText("A picture of what the current weather is like.")
    ).toHaveAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
    expect(queryByText("Today")).toBeInTheDocument();
    expect(
      getByAltText("A picture of what the forecasted weather is like on Today.")
    ).toHaveAttribute("src", "http://openweathermap.org/img/wn/10e@2x.png");
    expect(queryByText("Humidity 10%")).toBeInTheDocument();
    expect(queryByText(nextDay)).toBeInTheDocument();
    expect(
      getByAltText(
        `A picture of what the forecasted weather is like on ${nextDay}.`
      )
    ).toHaveAttribute("src", "http://openweathermap.org/img/wn/ee45@2x.png");
    expect(queryByText("Humidity 0%")).toBeInTheDocument();
  };

  describe("when in metric format", () => {
    it("renders the results in metric format", () => {
      testContent(false);
    });
  });

  describe("when in imperial format", () => {
    it("renders the results in imperial format", () => {
      testContent(true);
    });
  });
});
