import React, { Component } from 'react';
import Crawler from './Crawler.js';
import Controls from './Controls.js';
import CardContainer from './CardContainer.js';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      peopleArray : [],
      vehicleArray: [],
      planetArray: []
    };
  }

  componentDidMount() {
    this.getPeopleData();
    this.getVehicleData();
    this.getPlanetData();
  }


  getVehicleData() {
    fetch('https://swapi.co/api/vehicles/')
      .then(response => response.json())
      .then(vehicleData => vehicleData.results)
      .then(vehicleArray => {
        const finalVehicleArray = vehicleArray.map( vehicle => {
          return Object.assign({}, {
            name: vehicle.name,
            model: vehicle.model,
            class: vehicle.vehicle_class,
            passengers: vehicle.passengers
          });
        });
        this.setState({ vehicleArray: finalVehicleArray});
      });
  }

  //name, terrain, population, climate, residents
  getPlanetData() {
    fetch('https://swapi.co/api/planets/')
      .then(response => response.json())
      .then(planetData => planetData.results)
      .then(planetArray => {
        const residents = planetArray.map( planet =>{
          return planet.residents;
        });
        const unresolvedPromises = residents.map( resident =>{
          return resident.map( url => {
            return fetch(url).then(response => response.json());
          });
        });
        const promiseAll = Promise.all(unresolvedPromises.map( innerPromiseArray => {
          return Promise.all(innerPromiseArray);
        }));

        promiseAll.then( residentsArray => {
          const names = residentsArray.map( residentPlanet =>{
            return residentPlanet.map( resident => {
              return resident.name;
            });
          });
          const nameStringArray = names.map( name => {
            return name.toString();
          });
          const finalArray = nameStringArray.map( (names, index) => {
            return Object.assign({}, {
              name: planetArray[index].name,
              terrain: planetArray[index].terrain,
              population: planetArray[index].population,
              climate: planetArray[index].climate,
              residents: names});
          });
          this.setState({ planetArray: finalArray});
        });
      });
  }

  getPeopleData() {
    fetch('https://swapi.co/api/people/')
      .then(response => response.json())
      .then(peopleData => peopleData.results)
      .then(peopleArray => {
        const unresolvedPromisesSpecies = peopleArray.map( person =>{
          return fetch(person.species).then(response => response.json());
        });
        const unresolvedPromisesWorld = peopleArray.map( person =>{
          return fetch(person.homeworld).then(response => response.json());
        });

        const promiseAll = Promise.all([Promise.all(unresolvedPromisesSpecies), Promise.all(unresolvedPromisesWorld)]);

        promiseAll.then( speciesPlanetArray =>{
          const finalArray = speciesPlanetArray[1].map((planet, index) => {
            return Object.assign({}, { name: peopleArray[index].name,
              species: speciesPlanetArray[0][index].name,
              homeworld: planet.name,
              population: planet.population});
          });

          this.setState({ peopleArray: finalArray });
        });
      });
  }

  //catch set state to error view true

  render() {
    return (
      <div className="App">
        <h1>App  is here</h1>
        <Crawler />
        <Controls />
        <CardContainer peopleArray={this.state.peopleArray} />
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
