import React from "react";

import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor, RenderResult } from "@testing-library/react";
import dayjs from "dayjs";

import { renderWithWeatherConfig } from "../../../testHelpers";

import WeatherContent from "../";

const nextDay = dayjs().add(1, "day").format("dddd");

const expectNoResultsPage = (helpers: RenderResult) => {
  expect(helpers.queryByDisplayValue("Melbourne, AU")).toBeInTheDocument();
  expect(helpers.queryByRole("checkbox")).toBeInTheDocument();
  expect(helpers.queryByText("Imperial")).toBeInTheDocument();
  expect(helpers.queryByText("Today")).not.toBeInTheDocument();
  expect(helpers.queryByText(nextDay)).not.toBeInTheDocument();
  expect(helpers.queryByText(/visbility/)).not.toBeInTheDocument();
  expect(helpers.queryByText(/pressure/)).not.toBeInTheDocument();
  expect(helpers.queryByText(/cloudiness/)).not.toBeInTheDocument();
  expect(helpers.queryByText(/humidity/)).not.toBeInTheDocument();
  expect(helpers.queryByText(/°C/)).not.toBeInTheDocument();
  expect(helpers.queryByText(/°F/)).not.toBeInTheDocument();
};

describe("when loading", () => {
  it("renders the loading UI", () => {
    const helpers = renderWithWeatherConfig(<WeatherContent />, {
      isLoading: true,
      location: "Melbourne, AU",
    });

    expect(
      helpers.queryByText(
        "City not found. Please enter text in this format: City,Country code (eg. Melbourne,AU)"
      )
    ).not.toBeInTheDocument();
    expect(
      helpers.queryByText(
        "Something went wrong. Give it a moment and try again."
      )
    ).not.toBeInTheDocument();
    expect(helpers.queryByText("Loading...")).toBeInTheDocument();
    expectNoResultsPage(helpers);
  });
});

describe("when there is an error", () => {
  const testContent = (status = 404) => {
    const helpers = renderWithWeatherConfig(<WeatherContent />, {
      weatherDataStatus: status,
      location: "Melbourne, AU",
    });
    const errorMessage =
      status === 404
        ? "City not found. Please enter text in this format: City,Country code (eg. Melbourne,AU)"
        : "Something went wrong. Give it a moment and try again.";

    expect(helpers.queryByText("Loading...")).not.toBeInTheDocument();
    expect(helpers.queryByText(errorMessage)).toBeInTheDocument();
    expectNoResultsPage(helpers);
  };

  describe("when city cannot be found", () => {
    it("render the 404 content page", () => {
      testContent(404);
    });
  });

  describe("when there is an internal server error", () => {
    it("render the server error content page", () => {
      testContent(503);
    });
  });
});

describe("when results load successfully", () => {
  it("renders the content correctly", () => {
    const {
      queryByText,
      queryByDisplayValue,
      getByAltText,
      queryByRole,
    } = renderWithWeatherConfig(<WeatherContent />, {
      weatherDataStatus: 200,
      location: "Melbourne, AU",
    });

    expect(
      queryByText(
        "City not found. Please enter text in this format: City,Country code (eg. Melbourne,AU)"
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText("Something went wrong. Give it a moment and try again.")
    ).not.toBeInTheDocument();
    expect(queryByDisplayValue("Melbourne, AU")).toBeInTheDocument();
    expect(queryByText("Imperial")).toBeInTheDocument();
    expect(queryByRole("checkbox")).toBeInTheDocument();
    expect(queryByText(dayjs().format("dddd, MMMM Do"))).toBeInTheDocument();
    expect(queryByText("Cloudy")).toBeInTheDocument();
    expect(queryByText("35% chain of rain")).toBeInTheDocument();
    expect(queryByText("Visibility: 1000 metres")).toBeInTheDocument();
    expect(
      getByAltText("A picture of what the forecasted weather is like on Today.")
    ).toHaveAttribute("src", "http://openweathermap.org/img/wn/10e@2x.png");
  });

  describe("when user toggles on the imperial setting", () => {
    it("updates the checkbox selection", () => {
      const setIsImperialSpy = jest.fn();
      const { getByRole } = renderWithWeatherConfig(<WeatherContent />, {
        weatherDataStatus: 200,
        location: "Melbourne, AU",
        setIsImperial: setIsImperialSpy,
      });

      expect(setIsImperialSpy).toHaveBeenCalledTimes(0);
      const checkbox = getByRole("checkbox");

      userEvent.click(checkbox);
      fireEvent.change(checkbox, { target: { checked: true } });

      expect(checkbox).toBeChecked();
      expect(setIsImperialSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("when imperial units is enabled", () => {
    it("renders the checkbox in checked state", () => {
      const { getByRole } = renderWithWeatherConfig(<WeatherContent />, {
        isImperial: true,
      });

      const checkbox = getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });
  });

  describe("when imperial units is disabled", () => {
    it("renders the checkbox in not checked state", () => {
      const { getByRole } = renderWithWeatherConfig(<WeatherContent />, {
        isImperial: false,
      });

      const checkbox = getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("when user searches for a new city", () => {
    it("updates the input box and refreshes the widget", async () => {
      const refreshWidgetSpy = jest.fn(() => Promise.resolve());
      const { getByDisplayValue } = renderWithWeatherConfig(
        <WeatherContent />,
        {
          location: "yo",
          refreshWidget: refreshWidgetSpy,
        }
      );

      const input = getByDisplayValue("yo");
      userEvent.clear(input);
      userEvent.type(input, "Sydney{enter}");

      await waitFor(() => {
        expect(refreshWidgetSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
