export interface ForcastDayResponseJsonInterface {
  humidity: number; //  In percentage
  temp: {
    max: number; // In celsius or fahrenheit
    min: number; // In celsius or fahrenheit
  };
  weather: Array<{ icon: string }>;
}

export interface ForecastResponseJsonInterface {
  daily: Array<ForcastDayResponseJsonInterface>;
}

export interface WeatherResponseJsonInterface {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
}

export interface WeatherDataDayInterface {
  humidity: number; //  In percentage
  max: number; // In celsius
  min: number; // In celsius
  icon: string;
}

export interface WeatherDataInterface {
  days: Array<WeatherDataDayInterface>;
  currentTemp: number; // In celsius
  pressure: number; // In celsius
  humidity: number; // In hPa
  cloudiness: number; // In percentage
  visibility: number; // In metres
  description: {
    headline: string;
    details: string;
    icon: string;
  };
  wind: {
    degree: number; // In degrees,
    speed: number; // In kph
  };
}

export interface WeatherConfigContextInterface {
  isLoading: boolean;
  isImperial: boolean;
  location: string;
  weatherData: WeatherDataInterface;
  weatherDataStatus: number;
  setIsImperial: (u: boolean) => void;
  setLocation: (l: string) => void;
  refreshWidget: () => Promise<void>;
}
