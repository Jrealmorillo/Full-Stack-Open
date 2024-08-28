const SingleCountry = ({ country, weather }) => {
    return (
      <div>
        <h2>{country[0].name.common}</h2>
        <p>capital {country[0].capital}</p>
        <p>area {country[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country[0].languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country[0].flags.png}
          alt={`Flag of ${country[0].name.common}`}
          width={200}
        />
  
        {weather && (
          <>
            <h3>Weather in {country[0].capital}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
          </>
        )}
      </div>
    );
  };
  
  export default SingleCountry;
  