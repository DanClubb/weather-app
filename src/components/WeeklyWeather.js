import { useWeather } from "../store/weather-context";

function WeeklyWeather() {
  let { weatherData } = useWeather();

  let weekForcast = weatherData.daily.slice(1, 7);

  const getWeekDay = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    return date.toLocaleDateString("en-us", { weekday: "short" });
  };
  return (
    <div>
      <h2>week forcast</h2>
      {weekForcast.map((weekDay, index) => {
        return (
          <span>
            {getWeekDay(weekDay.dt)}
            <img
              src={`https://openweathermap.org/img/wn/${weekDay.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            {Math.round(weekDay.temp.day)}°
          </span>
        );
      })}
    </div>
  );
}

export default WeeklyWeather;
