import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import SingleCountry from "./components/SingleCountry";

function App() {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    setCountriesToShow(
      allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, allCountries]);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      const lat = country.capitalInfo.latlng[0];
      const lon = country.capitalInfo.latlng[1];

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [countriesToShow, apiKey]);

  const handleOnChange = (event) => {
    setFilter(event.target.value);
    setWeather(null);
  };

  const handleShowCountry = (countryName) => {
    const countrySelected = allCountries.find(
      (country) => country.name.common === countryName
    );
    setCountriesToShow([countrySelected]);
  };

  return (
    <div>
      <span>find countries: </span>
      <input value={filter} onChange={handleOnChange} />
      {countriesToShow.length > 1 && countriesToShow.length < 10 ? (
        <Countries countries={countriesToShow} onclick={handleShowCountry} />
      ) : countriesToShow.length === 1 ? (
        <SingleCountry country={countriesToShow} weather={weather} />
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
}

export default App;

