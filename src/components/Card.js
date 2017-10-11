import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ object, onFavoriteClick, activeClass }) => {
  let keys = Object.keys(object);
  return (
    <article
      className={activeClass}
      onClick={() => onFavoriteClick(object)}>
      <button className='fav-btn'>Favorite</button>
      <ul>
        {
          keys.map((key, index) =>
            <li className={key} key={index}>
              <span className={key}>{key}: </span>
              <span className={key + "1"}>{object[key]}</span>
            </li>)
        }
      </ul>
    </article>
  );
};

Card.propTypes = {
  object: PropTypes.object,
  onFavoriteClick: PropTypes.func,
  activeClass: PropTypes.string
};

export default Card;
