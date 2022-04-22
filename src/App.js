import { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("london");

  const [enteredLocation, setEnteredLocation] = useState("");

  useEffect(() => {
    async function test() {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=569606f42199c7a03a3785a75c44cd15&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);
      setIsLoading(false);
    }

    test();
  }, [location]);

  console.log(weatherData);

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
          <h2>{weatherData.weather[0].main}</h2>
          <h2>Temp: {Math.round(weatherData.main.temp)} °C</h2>
        </div>
      )}
    </div>
  );
}

export default App;
