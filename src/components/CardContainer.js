import React from 'react';
import Card from './Card.js';
import PropTypes from 'prop-types';
import '../styles/CardContainer.css';

const activeClass = (object, favoritesArray) => {
  const cardIndex = favoritesArray.findIndex(
    (favObject) => favObject.name === object.name
  );
  return cardIndex !== -1 ? 'active' : 'card';
};

const CardContainer = ({ array, onFavoriteClick, favoritesArray }) => (
  <div className='card-container'>
    {
      array.map( (object, index) =>
        <Card
          key={index}
          object={object}
          onFavoriteClick={onFavoriteClick}
          activeClass={activeClass(object, favoritesArray)} />
      )
    }
  </div>
);

CardContainer.propTypes = {
  array: PropTypes.array,
  onFavoriteClick: PropTypes.func,
  favoritesArray: PropTypes.array
};

export default CardContainer;
