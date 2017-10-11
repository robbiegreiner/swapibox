import React from 'react';
import Favorites from './Favorites.js';
import PropTypes from 'prop-types';


const Controls = ({ onClick }) => {
  return (
    <div>
      <h2>Controls here</h2>
      <Favorites />
      <button
        name='People'
        onClick={(event) => onClick(event.target.name)}>People</button>
      <button
        name='Planets'
        onClick={(event) => onClick(event.target.name)}>Planets</button>
      <button
        name='Vehicles'
        onClick={(event) => onClick(event.target.name)}>Vehicles</button>
    </div>
  );
};

Controls.propTypes = {
  onClick: PropTypes.func
};

export default Controls;
