import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Controls.css';

const activeButton = (currentView, category) => {
  if (currentView === category){
    return 'active-button';
  }
};


const Controls = ({ onClick, favoritesArray, currentView }) => (
  <div className='controls'>
    <button
      className={activeButton(currentView, 'People')}
      name='People'
      onClick={(event) => onClick(event.target.name, event)}>People</button>
    <button
      className={activeButton(currentView, 'Planets')}
      name='Planets'
      onClick={(event) => onClick(event.target.name, event)}>Planets</button>
    <button
      className={activeButton(currentView, 'Vehicles')}
      name='Vehicles'
      onClick={(event) => onClick(event.target.name, event)}>Vehicles</button>
    <button
      className={activeButton(currentView, 'Favorites')}
      name='Favorites'
      onClick={(event) => onClick(event.target.name, event)}>Favorites <span>{favoritesArray.length}</span></button>
  </div>
);

Controls.propTypes = {
  onClick: PropTypes.func,
  favoritesArray: PropTypes.array,
  currentView: PropTypes.string
};

export default Controls;
