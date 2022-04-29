import { useWeather } from "../store/weather-context";
import "./HourlyWeather.css";

function HourlyWeather() {
  let { weatherData } = useWeather();

  let hourlyForcast = weatherData.hourly.slice(0, 24);

  const addZero = (hour) => {
    if (hour < 10) {
      hour = "0" + hour;
    }
    return hour;
  };

  const getHour = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    const current = new Date();
    return date.getHours() === current.getHours()
      ? "Now"
      : addZero(date.getHours());
  };

  return (
    <div className="hourly-forcast-container">
      {hourlyForcast.map((hour) => {
        return (
          <div className="hour-forcast">
            <span>{getHour(hour.dt)} </span>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <span>{Math.round(hour.temp)}° </span>
          </div>
        );
      })}
    </div>
  );
}

export default HourlyWeather;
