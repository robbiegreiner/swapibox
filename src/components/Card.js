import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ object, onFavoriteClick }) => {
  let keys = Object.keys(object);
  return (
    <article
      className='card'
      onClick={() => onFavoriteClick(object)}>
      <ul>
        {
          keys.map((key, index) =>
            <li key={index}>
              <span>{key}: </span>
              {object[key]}
            </li>)
        }
      </ul>
      <button>Favorite</button>
    </article>
  );
};

Card.propTypes = {
  object: PropTypes.object,
  onFavoriteClick: PropTypes.func
};

export default Card;
