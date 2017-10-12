import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ object, setFavorite, activeClass }) => {
  let keys = Object.keys(object);
  return (
    <article
      className={activeClass}
      onClick={() => setFavorite(object)}>
      <div className="star"></div>
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
  setFavorite: PropTypes.func,
  activeClass: PropTypes.string
};

export default Card;
