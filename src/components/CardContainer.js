import React from 'react';
import Card from './Card.js';
import PropTypes from 'prop-types';

const CardContainer = ({ swapiList }) => (
  <div className='card-container'>
    {
      swapiList.map( (person, index) => {
        const { homeworld, name, population, species, language } = person;
        return (
          <Card
            key={index}
            homeworld={homeworld}
            language={language}
            name={name}
            species={species}
            population={population} />
        );
      })
    }
  </div>
);

CardContainer.propTypes = {
  swapiList: PropTypes.array
};

export default CardContainer;
