import React, { Component } from 'react';
import Crawler from './Crawler.js';
import Controls from './Controls.js';
import CardContainer from './CardContainer.js';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      peopleArray : []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('https://swapi.co/api/people/')
      .then(response => response.json())
      .then(peopleData => peopleData.results)
      .then(peopleArray => {
        const unresolvedPromises = peopleArray.map( person =>{
          return fetch(person.homeworld ).then(response => response.json());
        });

        const promiseAll = Promise.all(unresolvedPromises);
        promiseAll.then( planet =>{
          const finalArray = planet.map((planet, index) => {
            return Object.assign({}, { name: peopleArray[index].name,
              species: peopleArray[index].species,
              homeworld: planet.name,
              population: planet.population});
          });
          this.setState({ peopleArray: finalArray });
        });
      });
  }
  render() {
    return (
      <div className="App">
        <h1>App  is here</h1>
        <Crawler />
        <Controls />
        <CardContainer />
      </div>
    );
  }
}

// {
//     "films": "https://swapi.co/api/films/",
//     "people": "https://swapi.co/api/people/",
//     "planets": "https://swapi.co/api/planets/",
//     "species": "https://swapi.co/api/species/",
//     "starships": "https://swapi.co/api/starships/",
//     "vehicles": "https://swapi.co/api/vehicles/"
// }

export default App;
