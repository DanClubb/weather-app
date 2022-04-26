import ReactDOM from "react-dom";
import { WeatherProvider } from "./store/weather-context";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <WeatherProvider>
    <App />
  </WeatherProvider>,
  document.getElementById("root")
);
