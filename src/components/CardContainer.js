import React from 'react';
import Card from './Card.js';
import PropTypes from 'prop-types';

const CardContainer = ({ array }) => {
  return (
    <div className='card-container'>
      {
        array.map( (object, index) => {
          return (
            <Card
              key={index}
              object={object} />
          );
        })
      }
    </div>
  );
};

CardContainer.propTypes = {
  array: PropTypes.array
};

export default CardContainer;
