import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {Country} from './types';
import {BASE_URL, COUNTRIES_URL} from './constants';
import CountryItem from './components/CountryItem/CountryItem';
import CountryInfo from './components/CountryInfo/CountryInfo';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const { data: countries } = await axios.get<Country[]>(BASE_URL + COUNTRIES_URL);

    setCountries(countries);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-4 countriesList rounded-3 border border-2 p-3 border-light-subtle">
            <ul className="text-start p-0">
              {countries.map(country => (
                <CountryItem
                  key={country.alpha3Code}
                  name={country.name}
                  onClick={() => setSelectedCountryCode(country.alpha3Code)}
                />
              ))}
            </ul>
          </div>
          <div className="col-7 d-flex align-items-center ps-5 rounded-3 border border-2 p-3 border-light-subtle">
            <CountryInfo code={selectedCountryCode} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
