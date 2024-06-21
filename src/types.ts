export interface Country {
  name: string;
  alpha3Code: string;
}

export interface ApiCountry {
  name: string;
  alpha3Code: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  borders: string[];
  flag: string;
}