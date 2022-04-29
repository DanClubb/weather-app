import React, { useState, useContext, useCallback, useEffect } from "react";
const WeatherContext = React.createContext();

export const WeatherProvider = ({ ...props }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("london");
  const [unit, setUnit] = useState("metric");

  const changeUnit = () => {
    if (unit === "metric") setUnit("imperial");
    else setUnit("metric");
  };

  const getCoordinates = useCallback(() => {
    return new Promise((resolve) => {
      let coordinates = {
        latitude: "",
        longitude: "",
      };

      const callAPI = async () => {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GEOCODING_API_KEY}`
        );
        const data = await res.json();

        coordinates.latitude = data.results[0].geometry.location.lat;
        coordinates.longitude = data.results[0].geometry.location.lng;

        return coordinates;
      };
      resolve(callAPI());
    });
  }, [location]);

  useEffect(() => {
    async function getWeatherData() {
      let coordinates = await getCoordinates();
      const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=${unit}`;
      const res = await fetch(URL);
      const data = await res.json();
      setWeatherData(data);
      setIsLoading(false);
    }

    getWeatherData();
  }, [getCoordinates, unit]);

  console.log(weatherData);
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        isLoading,
        location,
        setLocation,
        unit,
        changeUnit,
      }}
      {...props}
    />
  );
};

export const useWeather = () => useContext(WeatherContext);

export default WeatherContext;
