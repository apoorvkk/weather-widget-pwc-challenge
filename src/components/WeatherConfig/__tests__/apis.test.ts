import { fetchWeatherData } from "../apis";
import { weatherDataJson, forecastDataJson } from "../../../testData";
import axios from "axios";

jest.mock("axios");

const expectedWeatherData = {
  cloudiness: 58,
  currentTemp: 15.85,
  days: [
    { humidity: 52, max: 25.85, min: 14.29, icon: "03d" },
    { humidity: 51, max: 25.68, min: 16.83, icon: "10d" },
  ],
  description: {
    headline: "Clouds",
    details: "broken clouds",
    icon: "04n",
  },
  humidity: 83,
  pressure: 1016,
  visibility: 10000,
  wind: {
    degree: 207,
    speed: 1.62,
  },
};

describe("when first request fails", () => {
  it("returns with a failed status and empty data", async () => {
    (axios.get as jest.Mock).mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 503,
          data: null,
        })
      )
    );

    const response = await fetchWeatherData("Melbourne, Au");

    expect(response).toEqual({
      status: 503,
      data: null,
    });
    expect((axios.get as jest.Mock).mock.calls[0]).toEqual([
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          APPID: "2f2e50de44eb31e3a65e1d9d2acb2d44",
          q: "Melbourne, Au",
          units: "metric",
        },
      },
    ]);
  });
});

describe("when second request fails", () => {
  it("returns with a failed status and empty data", async () => {
    (axios.get as jest.Mock).mockImplementation(
      jest.fn((url) => {
        if (url === "https://api.openweathermap.org/data/2.5/weather") {
          return Promise.resolve({
            status: 200,
            data: weatherDataJson,
          });
        } else if (url === "https://api.openweathermap.org/data/2.5/onecall") {
          return Promise.resolve({
            status: 404,
            data: null,
          });
        }
      })
    );

    const response = await fetchWeatherData("Melbourne, Au");

    expect(response).toEqual({
      status: 404,
      data: null,
    });

    expect((axios.get as jest.Mock).mock.calls[1]).toEqual([
      "https://api.openweathermap.org/data/2.5/onecall",
      {
        params: {
          APPID: "2f2e50de44eb31e3a65e1d9d2acb2d44",
          exclude: "current,minutely,hourly",
          lat: -37.88,
          lon: 145.16,
          units: "metric",
        },
      },
    ]);
  });
});

describe("when all requests succeed", () => {
  it("returns the weather data with a successful status", async () => {
    (axios.get as jest.Mock).mockImplementation(
      jest.fn((url) => {
        if (url === "https://api.openweathermap.org/data/2.5/weather") {
          return Promise.resolve({
            status: 200,
            data: weatherDataJson,
          });
        } else if (url === "https://api.openweathermap.org/data/2.5/onecall") {
          return Promise.resolve({
            status: 200,
            data: forecastDataJson,
          });
        }
      })
    );

    const response = await fetchWeatherData("Melbourne, Au");

    expect(response).toEqual({
      status: 200,
      data: expectedWeatherData,
    });
  });
});
