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

const CardContainer = ({ currentDataArray, setFavorite, favoritesArray, currentView }) => {
  if (!favoritesArray.length && currentView === 'Favorites'){
    return (
      <div className='card-container'>
        <h1>Much favorites you seek...</h1>
      </div>
    );
  } else {
    return (
      <div className='card-container'>
        {
          currentDataArray.map( (object, index) =>
            <Card
              key={index}
              object={object}
              setFavorite={setFavorite}
              activeClass={activeClass(object, favoritesArray)} />
          )
        }
      </div>
    );
  }
};

CardContainer.propTypes = {
  currentDataArray: PropTypes.array,
  setFavorite: PropTypes.func,
  favoritesArray: PropTypes.array,
  currentView: PropTypes.string
};

export default CardContainer;
