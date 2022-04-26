import { useWeather } from "../store/weather-context";

function CurrentWeather() {
  let { weatherData } = useWeather();

  return (
    <div>
      <h2>{weatherData.current.weather[0].main}</h2>
      <h2>Temp: {Math.round(weatherData.current.temp)}°</h2>
      <div>
        <span>H:{Math.round(weatherData.daily[0].temp.max)}° </span>
        <span>
          L:
          {Math.round(weatherData.daily[0].temp.min)}°
        </span>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
        />
      </div>
    </div>
  );
}

export default CurrentWeather;
