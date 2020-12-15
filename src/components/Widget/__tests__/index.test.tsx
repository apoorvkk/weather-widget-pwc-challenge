import React from "react";

import userEvent from "@testing-library/user-event";
import { render, waitFor } from "@testing-library/react";

import { mockApiRequests } from "../../../testHelpers";
import {
  secondaryWeatherDataJson,
  secondaryForecastDataJson,
} from "../../../testData";
import Widget from "..";

it("renders an interactive widget", async () => {
  mockApiRequests();

  const { queryByText, getByDisplayValue } = render(<Widget />);

  await waitFor(() => {
    expect(queryByText("Loading...")).not.toBeInTheDocument();
  });

  expect(queryByText("Broken clouds")).toBeInTheDocument();
  expect(queryByText("Wind: 1.62 kph S")).toBeInTheDocument();
  expect(queryByText("Pressure: 1016 hPa")).toBeInTheDocument();
  expect(queryByText("Today")).toBeInTheDocument();
  expect(queryByText("Humidity 52%")).toBeInTheDocument();

  mockApiRequests(secondaryWeatherDataJson, secondaryForecastDataJson);

  const input = getByDisplayValue("Melbourne, AU");
  userEvent.clear(input);
  userEvent.type(input, "New York{enter}");

  expect(queryByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(queryByText("Loading...")).not.toBeInTheDocument();
  });

  expect(queryByText("3°C")).toBeInTheDocument();
  expect(queryByText("Clear sky")).toBeInTheDocument();
  expect(queryByText("Wind: 16.70 kph NW")).toBeInTheDocument();
  expect(queryByText("Cloudiness: 1%")).toBeInTheDocument();
  expect(queryByText("Today")).toBeInTheDocument();
  expect(queryByText("-2°")).toBeInTheDocument();
  expect(queryByText("Humidity 94%")).toBeInTheDocument();
});
