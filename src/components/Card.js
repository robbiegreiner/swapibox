import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ cardObject, setFavorite, activeClass }) => {
  let keys = Object.keys(cardObject);
  return (
    <article
      className={activeClass}
      onClick={() => setFavorite(cardObject)}>
      <div className="star"></div>
      <ul>
        {
          keys.map((key, index) =>
            <li className={key} key={index}>
              <span className={key}>{key}: </span>
              <span className={key + "1"}>{cardObject[key]}</span>
            </li>)
        }
      </ul>
    </article>
  );
};

Card.propTypes = {
  cardObject: PropTypes.object,
  setFavorite: PropTypes.func,
  activeClass: PropTypes.string
};

export default Card;
