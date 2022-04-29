import { useWeather } from "./store/weather-context";
import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyWeather from "./components/WeeklyWeather";
import "./App.css";
import HourlyWeather from "./components/HourlyWeather";

function App() {
  let { setLocation, isLoading, changeUnit, unit } = useWeather();

  const [enteredLocation, setEnteredLocation] = useState("");

  const enteredLocationChangeHandler = (e) => {
    setEnteredLocation(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLocation(enteredLocation);
  };

  return (
    <div>
      <header className="header">
        <form className="search-bar" onSubmit={submitHandler}>
          <input
            className="search-bar__input"
            type="text"
            value={enteredLocation}
            onChange={enteredLocationChangeHandler}
            placeholder="Enter city"
            required
          />
          <button className="search-bar__search" type="submit">
            Search
          </button>
        </form>
        <button className="unit-toggle" onClick={changeUnit}>
          <span className={unit === "metric" ? "active-unit" : ""}>°C</span> /{" "}
          <span className={unit === "imperial" ? "active-unit" : ""}>°F</span>
        </button>
      </header>

      {isLoading && <h2>Loading</h2>}
      {!isLoading && (
        <main>
          <div className="current-day-forcast">
            <CurrentWeather />
            <HourlyWeather />
          </div>

          <WeeklyWeather />
        </main>
      )}
    </div>
  );
}

export default App;
