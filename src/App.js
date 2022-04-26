import { useWeather } from "./store/weather-context";
import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyWeather from "./components/WeeklyWeather";

function App() {
  let { location, setLocation, isLoading } = useWeather();

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
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={enteredLocation}
          onChange={enteredLocationChangeHandler}
        />
        <button type="submit">Search</button>
      </form>

      <h1>{location}</h1>

      {isLoading && <h2>Loading</h2>}
      {!isLoading && (
        <div>
          <CurrentWeather />
          <WeeklyWeather />
        </div>
      )}
    </div>
  );
}

export default App;
