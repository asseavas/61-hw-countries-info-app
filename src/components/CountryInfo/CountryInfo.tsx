import React, { useCallback, useEffect, useState } from 'react';
import { ApiCountry, Country } from '../../types';
import axios from 'axios';
import { BASE_URL, COUNTRY_URL } from '../../constants';

interface Props {
  code: string | null;
}

const CountryInfo: React.FC<Props> = ({ code }) => {
  const [country, setCountry] = useState<null | ApiCountry>(null);
  const [borders, setBorders] = useState<Country[]>([]);

  const fetchData = useCallback(async () => {
    if (code !== null) {
      setCountry(null);
      setBorders([]);

      const { data: country } = await axios.get<ApiCountry>(BASE_URL + COUNTRY_URL + code);
      setCountry(country);

      if (country.borders.length > 0) {
        const borderPromises = country.borders.map(async borderCode => {
          const { data: borderCountry } = await axios.get<Country>(BASE_URL + COUNTRY_URL + borderCode);
          return borderCountry;
        });
        const borderCountries = await Promise.all(borderPromises);
        setBorders(borderCountries);
      }
    }
  }, [code]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return country && (
    <div className="d-flex text-start flex-column gap-2">
      <h2>{country.name} ({country.alpha3Code})</h2>
      <img src={country.flag} alt={`Flag of ${country.name}`} style={{ width: '200px', height: 'auto' }} />
      <p><strong>Capital: </strong>{country.capital}</p>
      <p><strong>Population: </strong>{country.population}</p>
      <p><strong>Region: </strong>{country.region}</p>
      <p><strong>Subregion: </strong>{country.subregion}</p>
      {borders.length > 0 ? (
        <div>
          <strong>Borders: </strong>
          <ul>
            {borders.map(borderCountry => (
              <li key={borderCountry.alpha3Code}>{borderCountry.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No land borders</div>
      )}
    </div>
  );
};

export default CountryInfo;
