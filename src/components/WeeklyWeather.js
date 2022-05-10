import { useWeather } from "../store/weather-context";
import "./WeeklyWeather.css";

function WeeklyWeather() {
  let { weatherData } = useWeather();

  let weekForcast = weatherData.daily.slice(1, 7);

  const getWeekDay = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    return date.toLocaleDateString("en-us", { weekday: "long" });
  };
  return (
    <div className="week-forcast">
      <div className="test">
        <span>Day</span>
        <span>Temp</span>
        <span>Chance Of Rain</span>
        <span>Humidity</span>
      </div>
      {weekForcast.map((weekDay, index) => {
        return (
          <div className="test">
            <span className="weekday">{getWeekDay(weekDay.dt)}</span>
            <span>
              <img
                src={`https://openweathermap.org/img/wn/${weekDay.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </span>
            <span>{Math.round(weekDay.temp.day)}°</span>
            <span>{Math.round(weekDay.pop * 100)}%</span>
            <span>{weekDay.humidity}%</span>
          </div>
        );
      })}
    </div>
  );
}

export default WeeklyWeather;
