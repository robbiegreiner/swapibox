import React, { Component } from 'react';
import Crawler from './Crawler.js';
import Favorites from './Favorites.js';
import Controls from './Controls.js';
import CardContainer from './CardContainer.js';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <h1>App  is here</h1>
        <Crawler />
        <Favorites />
        <Controls />
        <CardContainer />
      </div>
    );
  }
}

export default App;
