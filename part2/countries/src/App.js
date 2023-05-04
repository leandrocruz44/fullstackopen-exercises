import { useEffect, useState } from "react";
import fetchData from "./services/backendComm";
import ShowCountries from "./Components/ShowCountries";


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (search) {
      fetchData(`https://restcountries.com/v3.1/name/${search}`)
      .then(response => {
        setCountries(response)
        setError('')
      })
      .catch(error => {
        setError('This country could not be found')
        setCountries([])
      })
    }
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <div>Find Countries: <input value={search} onChange={handleSearch}></input></div>
      <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>
      <ShowCountries countries={countries} select={handleSearch}/>
    </div>
  )
}

export default App;
