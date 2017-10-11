import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const activeClass = (object, favoritesArray) => {
  const cardIndex = favoritesArray.findIndex(
    (favObject) => favObject.name === object.name
  );
  return cardIndex !== -1 ? 'active' : 'card';
};

const Favorites = ({ favoritesArray, onFavoriteClick }) => {
  if (favoritesArray.length === 0) {
    return (
      <div>
        Add Favorites!
      </div>
    );
  } else {
    return (
      <div>
        {
          favoritesArray.map( (object, index) => (
            <Card
              key={index}
              object={object}
              activeClass={activeClass(object, favoritesArray)}
              onFavoriteClick={onFavoriteClick} />
          )
          )
        }
      </div>
    );
  }
};

Favorites.propTypes = {
  favoritesArray: PropTypes.array,
  onFavoriteClick: PropTypes.func
};

export default Favorites;
