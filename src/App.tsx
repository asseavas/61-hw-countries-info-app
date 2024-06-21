import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {ApiCountry, Country} from './types';
import {BASE_URL, COUNTRIES_URL, COUNTRY_URL} from './constants';
import CountryItem from './components/CountryItem/CountryItem';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchData = useCallback( async () => {
    const {data: countries} = await axios.get<Country[]>(BASE_URL + COUNTRIES_URL);

    const promises = countries.map(async country => {
      const countryUrl = BASE_URL + COUNTRY_URL + country.alpha3Code;
      const {data: oneCountry} = await axios.get<ApiCountry>(countryUrl);

      return {
        name: country.name,
        alpha3Code: country.alpha3Code,
        capital: oneCountry.capital,
        subregion: oneCountry.subregion,
        population: oneCountry.population,
        borders: oneCountry.borders,
        flag: oneCountry.flag,
      };
    });

    const newCountries = await Promise.all(promises);

    setCountries(newCountries);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 countriesList">
            <ul className="text-start">
              {countries.map(country => (
                <CountryItem
                  key={country.alpha3Code}
                  name={country.name}
                />
              ))}
            </ul>
          </div>
          <div className="col-8">

          </div>
        </div>
      </div>
    </>
  );
};

export default App;
