import { useState } from "react";
import "./AdvancedDetails.css";
import { useWeather } from "../store/weather-context";

function AdvancedDetails() {
  let { weatherData } = useWeather();

  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);

  const advancedDetailsHandler = () => {
    setShowAdvancedDetails((prevState) => {
      return !prevState;
    });
  };

  const getSunrise = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    return date.toLocaleTimeString("it-IT", { timeStyle: "short" });
  };

  const getSunset = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    return date.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="advanced">
      {!showAdvancedDetails && (
        <button className="button" onClick={advancedDetailsHandler}>
          Show Advanced Details
        </button>
      )}
      {showAdvancedDetails && (
        <div className="advanced-details-container">
          <div className="details-container">
            <ul className="advanced-details">
              <li className="detail">
                <label>Sunrise</label>
                <div>{getSunrise(weatherData.daily[0].sunrise)}</div>
              </li>
              <li className="detail">
                <label>Sunset</label>
                <div>{getSunset(weatherData.daily[0].sunset)}</div>
              </li>
              <li className="detail">
                <label>Chance Of Rain</label>
                <div>{Math.round(weatherData.daily[0].pop * 100)}%</div>
              </li>
              <li className="detail">
                <label>Humidity</label>
                <div>{Math.round(weatherData.current.humidity)}%</div>
              </li>
              <li className="detail">
                <label>Wind</label>
                <div>{Math.round(weatherData.current.wind_speed)} km/h</div>
              </li>
            </ul>

            <ul className="advanced-details">
              <li className="detail">
                <label>Feels Like</label>
                <div>{Math.round(weatherData.current.feels_like)}°</div>
              </li>
              <li className="detail">
                <label>Precipitation</label>
                <div>{Math.round(weatherData.daily[0].pop * 100)}%</div>
              </li>
              <li className="detail">
                <label>Pressure</label>
                <div>{weatherData.current.pressure} hPa</div>
              </li>
              <li className="detail">
                <label>Visibility</label>
                <div>
                  {Math.round(weatherData.current.visibility / 1000)} km
                </div>
              </li>
              <li className="detail">
                <label>UV Index</label>
                <div>{Math.round(weatherData.current.uvi)}</div>
              </li>
            </ul>
          </div>
          <button className="button" onClick={advancedDetailsHandler}>
            Hide Advanced Details
          </button>
        </div>
      )}
    </div>
  );
}

export default AdvancedDetails;
