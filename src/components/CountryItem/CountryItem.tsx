import React from 'react';
import './CountryItem.css';

interface Props {
  name: string;
}

const CountryItem: React.FC<Props> = ({name}) => {
  return (
    <li className="countryItem rounded mb-2">
      <a href='#' type="button" className="w-100 ps-4 p-2 link-underline link-underline-opacity-0 text-dark">{name}</a>
    </li>
  );
};

export default CountryItem;