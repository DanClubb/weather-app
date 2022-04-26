import React, { useState, useContext, useCallback, useEffect } from "react";
const WeatherContext = React.createContext();

export const WeatherProvider = ({ ...props }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("london");

  const getCoordinates = useCallback(() => {
    return new Promise((resolve) => {
      let coordinates = {
        latitude: "",
        longitude: "",
      };

      const callAPI = async () => {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyA5CNqTNK8SXI-FCEG0OuW1UDd_q92ZdP8`
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
      const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely,hourly&appid=569606f42199c7a03a3785a75c44cd15&units=metric`;
      const res = await fetch(URL);
      const data = await res.json();
      setWeatherData(data);
      setIsLoading(false);
    }

    getWeatherData();
  }, [getCoordinates]);

  console.log(weatherData);
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        isLoading,
        location,
        setLocation,
      }}
      {...props}
    />
  );
};

export const useWeather = () => useContext(WeatherContext);

export default WeatherContext;
