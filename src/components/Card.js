import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ name, homeworld, species, language, population }) => (
  <article className='card'>
    <h3>{name}</h3>
    <ul>
      <li>Homeworld: {homeworld}</li>
      <li>Species: {species}</li>
      <li>Language: {language}</li>
      <li>Population: {population}</li>
    </ul>
  </article>
);

Card.propTypes = {
  homeworld: PropTypes.string,
  species: PropTypes.string,
  language: PropTypes.string,
  population: PropTypes.string,
  name: PropTypes.string
};

export default Card;
