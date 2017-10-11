import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ object }) => {
  let keys = Object.keys(object);
  return (
    <article className='card'>
      <ul>
        {
          keys.map((key, index) =>
            <li key={index}>
              <span>{key}: </span>
              {object[key]}
            </li>)
        }
      </ul>
    </article>
  );
};

Card.propTypes = {
  object: PropTypes.object
};

export default Card;
