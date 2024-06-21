import React from 'react';

interface Props {
  name: string;
}

const CountryItem: React.FC<Props> = ({name}) => {
  return (
    <li className="country-item">
      <a href='#' type="button" className="">{name}</a>
    </li>
  );
};

export default CountryItem;