import React from 'react';
import Card from './Card.js';
import PropTypes from 'prop-types';
import '../styles/CardContainer.css';

const CardContainer = ({ array, onFavoriteClick }) => (
  <div className='card-container'>
    {
      array.map( (object, index) => {
        return (
          <Card
            key={index}
            object={object}
            onFavoriteClick={onFavoriteClick} />
        );
      })
    }
  </div>
);

CardContainer.propTypes = {
  array: PropTypes.array,
  onFavoriteClick: PropTypes.func
};

export default CardContainer;
