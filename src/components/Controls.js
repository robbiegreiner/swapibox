import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Controls.css';


const Controls = ({ onClick, favoritesArray }) => (
  <div className='controls'>
    <button
      name='People'
      onClick={(event) => onClick(event.target.name)}>People</button>
    <button
      name='Planets'
      onClick={(event) => onClick(event.target.name)}>Planets</button>
    <button
      name='Vehicles'
      onClick={(event) => onClick(event.target.name)}>Vehicles</button>
    <button
      name='Favorites'
      onClick={(event) => onClick(event.target.name)}>Favorites <span>{favoritesArray.length}</span></button>
  </div>
);

Controls.propTypes = {
  onClick: PropTypes.func,
  favoritesArray: PropTypes.array
};

export default Controls;
