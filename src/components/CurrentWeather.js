import { useWeather } from "../store/weather-context";
import "./CurrentWeather.css";

function CurrentWeather() {
  let { weatherData, location } = useWeather();

  return (
    <div className="current-weather-container">
      <div className="location">{location}</div>
      <div className="current-weather__description">
        {weatherData.current.weather[0].main}
      </div>
      <div className="current-weather__temp">
        {Math.round(weatherData.current.temp)}°
      </div>
      <div>
        <span className="current-weather__temp-high">
          H:{Math.round(weatherData.daily[0].temp.max)}°{" "}
        </span>
        <span className="current-weather__temp-low">
          L:
          {Math.round(weatherData.daily[0].temp.min)}°
        </span>
      </div>
    </div>
  );
}

export default CurrentWeather;
