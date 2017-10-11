import React, { Component } from 'react';
import Crawler from './Crawler.js';
import Controls from './Controls.js';
import CardContainer from './CardContainer.js';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentView: 'people',
      errorReturned: null,
      currentDataArray: null,
      favoritesArray: [],
      peopleArray: null,
      planetArray: null,
      vehicleArray: null,
      filmArray: null,
      whichCrawler: Math.floor(Math.random() * (6 - 0 + 1))
    };
  }

  componentDidMount() {
    this.getPeopleData();
    this.getCrawlerData();
    this.getVehicleData();
    this.getPlanetData();
  }

  getCrawlerData() {
    fetch('https://swapi.co/api/films/')
      .then(response => response.json())
      .then(filmData => filmData.results)
      .then(filmArray => {
        const finalArray = filmArray.map( film => {
          return Object.assign({}, {
            title: film.title,
            openingCrawl: film.opening_crawl,
            release: film.release_date
          });
        });
        this.setState({ filmArray: finalArray });
      })
      .catch( error => this.setState( { errorReturned: error } ));
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
      })
      .catch( error => this.setState( { errorReturned: error } ));
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
      })
      .catch( error => this.setState( { errorReturned: error } ));
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
          this.setState({
            peopleArray: finalArray,
            currentDataArray: finalArray});
        });
      });
  }

  // need better name for this function
  onClick = (query) => {
    if (query === 'People') {
      this.setState({
        currentDataArray: this.state.peopleArray,
        currentView: 'people'});
    }
    if (query === 'Planets') {
      this.setState({
        currentDataArray: this.state.planetArray,
        currentView: 'planets'});
    }
    if (query === 'Vehicles')  {
      this.setState({
        currentDataArray: this.state.vehicleArray,
        currentView: 'vehicles'});
    }
    if (query === 'Favorites' && this.state.favoritesArray)  {
      this.setState({
        currentDataArray: this.state.favoritesArray,
        currentView: 'favorites'});
    }
  };

  // need better name for this
  onFavoriteClick = (object) => {
    const { favoritesArray } = this.state;
    const tempArray = favoritesArray.filter(card => card.name !== object.name);

    if (tempArray.length === favoritesArray.length) {
      tempArray.push(object);
    }
    this.setState({
      favoritesArray: tempArray
    });

    if (this.state.currentView === 'favorites'){
      this.setState({ currentDataArray: tempArray});
    }

  }

  // catch set state to error view true

  render() {
    const { peopleArray, planetArray, vehicleArray, filmArray, whichCrawler, favoritesArray, currentDataArray, errorReturned, currentView } = this.state;

    // if (peopleArray && vehicleArray && planetArray && filmArray) {
    if (peopleArray && planetArray && vehicleArray && filmArray && currentDataArray) {
      return (
        <div className="App">
          <h1 className="logo">SWAPI BOX</h1>
          <Crawler
            filmArray={filmArray}
            whichCrawler={whichCrawler} />
          <Controls onClick={this.onClick} />
          <CardContainer
            currentDataArray={currentDataArray}
            favoritesArray={favoritesArray}
            onFavoriteClick={this.onFavoriteClick}
            showFavorites={this.showFavorites}
            currentView={currentView}/>
        </div>
      );
    } else if (errorReturned) {
      return (
        <div className="error-screen">
          <h2>Uh oh, something went wrong.</h2>
          <h3>{errorReturned}</h3>
        </div>
      );
    } else if (errorReturned) {
      return (
        <div className="error-screen">
          <h2>Uh oh, something went wrong.</h2>
          <h3>{errorReturned}</h3>
        </div>
      );
    } else {
      return (
        <div className="loading-screen">
          <h2>Loading...</h2>
        </div>
      );
    }
  }
}


export default App;
