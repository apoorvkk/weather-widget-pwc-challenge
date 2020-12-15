import React from "react";

import { render, RenderResult, waitFor } from "@testing-library/react";

import { mockApiRequests } from "../../../testHelpers";
import { useWeatherConfig } from "../context";
import * as apis from "../apis";
import WeatherConfig from "../";

jest.mock("axios");

const SampleApp = (): React.ReactElement => {
  const {
    isLoading,
    isImperial,
    location,
    weatherDataStatus,
    weatherData,
    setIsImperial,
    setLocation,
    refreshWidget,
  } = useWeatherConfig();

  return (
    <ul>
      <li>{`isLoading: ${isLoading}`}</li>
      <li>{`isImperial: ${isImperial}`}</li>
      <li>{`location: ${location}`}</li>
      <li>{`status: ${weatherDataStatus}`}</li>
      <li>{`setIsImperial: ${!!setIsImperial}`}</li>
      <li>{`setLocation: ${!!setLocation}`}</li>
      <li>{`refreshWidget: ${!!refreshWidget}`}</li>
      <li>{`weatherData: ${JSON.stringify(weatherData)}`}</li>
    </ul>
  );
};

const renderWeatherConfig = (): RenderResult => {
  mockApiRequests();

  return render(
    <WeatherConfig>
      <SampleApp />
    </WeatherConfig>
  );
};

const expectConfigContent = (helpers: RenderResult) => {
  expect(helpers.queryByText("isImperial: false")).toBeInTheDocument();
  expect(helpers.queryByText("location: Melbourne, AU")).toBeInTheDocument();
  expect(helpers.queryByText("setIsImperial: true")).toBeInTheDocument();
  expect(helpers.queryByText("refreshWidget: true")).toBeInTheDocument();
  expect(helpers.queryByText("setLocation: true")).toBeInTheDocument();
  expect(helpers.queryByText("refreshWidget: true")).toBeInTheDocument();
};

it("provides the widget config data to children", async () => {
  const helpers = renderWeatherConfig();

  await waitFor(() => {
    expect(helpers.queryByText("isLoading: false")).toBeInTheDocument();
  });

  expect(helpers.queryByText("status: 200")).toBeInTheDocument();

  const weatherDataText =
    'weatherData: {"days":[{"humidity":52,"max":25.85,"min":14.29,"icon":"03d"},{"humidity":51,"max":25.68,"min":16.83,"icon":"10d"}],"currentTemp":15.85,"pressure":1016,"humidity":83,"cloudiness":58,"description":{"headline":"Clouds","details":"broken clouds","icon":"04n"},"visibility":10000,"wind":{"degree":207,"speed":1.62}}';
  expect(helpers.queryByText(`weatherData: ${weatherDataText}`));

  expectConfigContent(helpers);
});

describe("when there is an error", () => {
  describe("when response fails due to 404 or 500 internal server error", () => {
    it("does not return weather data", async () => {
      jest
        .spyOn(apis, "fetchWeatherData")
        .mockImplementation(
          jest.fn(() => Promise.resolve({ status: 404, data: null }))
        );

      const helpers = renderWeatherConfig();

      await waitFor(() => {
        expect(helpers.queryByText("isLoading: false")).toBeInTheDocument();
      });

      expect(helpers.queryByText("status: 404")).toBeInTheDocument();
      expect(helpers.queryByText("weatherData: null")).toBeInTheDocument();

      expectConfigContent(helpers);
    });
  });

  describe("when request fails for an unknown reason", () => {
    it("does not return weather data", async () => {
      jest
        .spyOn(apis, "fetchWeatherData")
        .mockImplementation(
          jest.fn(() => Promise.reject({ response: { status: 999 } }))
        );

      const helpers = renderWeatherConfig();

      await waitFor(() => {
        expect(helpers.queryByText("isLoading: false")).toBeInTheDocument();
      });

      expect(helpers.queryByText("status: 999")).toBeInTheDocument();
      expect(helpers.queryByText("weatherData: null")).toBeInTheDocument();

      expectConfigContent(helpers);
    });
  });
});
