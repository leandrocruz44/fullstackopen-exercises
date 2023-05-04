const ShowCountries = ({ countries, select }) => {
    console.log(countries)
    if (countries.length > 10) {
      return (
        <p>Too many matches. Needs more information</p>
      )
    }
  
    if (countries.length > 1) {
      return (
        <div>
          {countries.map(country =>
            <p key={country.name.common}>
              {country.name.common} - 
              <button value={country.name.common} onClick={select}>Show</button>
            </p>
          )}
        </div>
      )
    }
  
    if (countries.length === 1) {
      return (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital[0]}</p>
          <p>Area: {countries[0].area} km²</p>
          <h4>Languages</h4>
          <ul>
            {Object.keys(countries[0].languages).map(language => 
              <li key={language}>{countries[0].languages[language]}</li>
            )}
          </ul>
          <img src={countries[0].flags.png} alt={countries[0].flags.alt}></img>
        </div>
      )
    }
  }

export default ShowCountries