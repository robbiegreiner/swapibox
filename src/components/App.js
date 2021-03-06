import React, { Component } from 'react';
import Crawler from './Crawler.js';
import Controls from './Controls.js';
import CardContainer from './CardContainer.js';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentView: 'People',
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
    if (localStorage.filmArray && localStorage.peopleArray && localStorage.vehicleArray && localStorage.planetArray){
      this.getFromLocalStorage();
    } else {
      this.getPeopleData();
      this.getCrawlerData();
      this.getVehicleData();
      this.getPlanetData();
    }
  }

  getFromLocalStorage() {
    const filmArray = JSON.parse(localStorage.getItem('filmArray'));
    const peopleArray = JSON.parse(localStorage.getItem('peopleArray'));
    const vehicleArray = JSON.parse(localStorage.getItem('vehicleArray'));
    const planetArray = JSON.parse(localStorage.getItem('planetArray'));
    let favoritesArray = [];
    if (localStorage.favoritesArray) {
      favoritesArray = JSON.parse(localStorage.getItem('favoritesArray'));
    }


    this.setState({
      peopleArray: peopleArray,
      filmArray: filmArray,
      vehicleArray: vehicleArray,
      planetArray: planetArray,
      currentDataArray: peopleArray,
      favoritesArray: favoritesArray
    });
  }

  setErrorStatus(error) {
    this.setState({
      errorReturned: true,
      errorMessage: error.message });
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
        localStorage.setItem('filmArray', JSON.stringify(finalArray));
      })
      .catch( error => this.setErrorStatus(error));
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
        localStorage.setItem('vehicleArray', JSON.stringify(finalVehicleArray));
      })
      .catch( error => this.setErrorStatus(error));
  }

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
          localStorage.setItem('planetArray', JSON.stringify(finalArray));
        });
      })
      .catch( error => this.setErrorStatus(error));
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
          localStorage.setItem('peopleArray', JSON.stringify(finalArray));
        });
      }).catch( error => this.setErrorStatus(error));
  }

  changeCategory = (query) => {
    if (query === 'People') {
      this.setState({
        currentDataArray: this.state.peopleArray,
        currentView: 'People'});
    }
    if (query === 'Planets') {
      this.setState({
        currentDataArray: this.state.planetArray,
        currentView: 'Planets'});
    }
    if (query === 'Vehicles')  {
      this.setState({
        currentDataArray: this.state.vehicleArray,
        currentView: 'Vehicles'});
    }
    if (query === 'Favorites' && this.state.favoritesArray)  {
      this.setState({
        currentDataArray: this.state.favoritesArray,
        currentView: 'Favorites'});
    }
  };

  setFavorite = (cardObject) => {
    const { favoritesArray } = this.state;
    const tempArray = favoritesArray.filter(card => card.name !== cardObject.name);

    if (tempArray.length === favoritesArray.length) {
      tempArray.push(cardObject);
    }
    this.setState({
      favoritesArray: tempArray
    });

    localStorage.setItem('favoritesArray', JSON.stringify(tempArray));

    if (this.state.currentView === 'Favorites'){
      this.setState({ currentDataArray: tempArray});
    }

  }

  render() {
    const { peopleArray, planetArray, vehicleArray, filmArray, whichCrawler, favoritesArray, currentDataArray, errorReturned, currentView } = this.state;

    if (peopleArray && planetArray && vehicleArray && filmArray && currentDataArray) {
      return (
        <div className="App">
          <h1 className="logo">SWAPI BOX</h1>
          <Crawler
            filmArray={filmArray}
            whichCrawler={whichCrawler} />
          <Controls
            changeCategory={this.changeCategory}
            favoritesArray={favoritesArray}
            currentView={currentView}/>
          <CardContainer
            currentDataArray={currentDataArray}
            favoritesArray={favoritesArray}
            setFavorite={this.setFavorite}
            showFavorites={this.showFavorites}
            currentView={currentView}/>
        </div>
      );
    } else if (errorReturned) {
      return (
        <div className="error-screen">
          <h1>Uh oh, something went wrong.</h1>
          <img alt='luke yelling no' className='luke-img' src={ require('../images/error.gif') } />
        </div>
      );
    } else {
      return (
        <div className="loading-screen">
          <h1>Loading...</h1>
          <img alt='luke lifting up yoda' className='yoda-img' src={ require('../images/yoda.gif') } />
        </div>
      );
    }
  }
}


export default App;
