import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { mount } from 'enzyme';
import config from '../setupTests.js';
import mockData from './mockData.js';
import favoriteData from './favoriteMockData.js';
import filmData from './filmMockData.js';
import planetData from './planetMockData.js';
import vehicleData from './vehicleMockData.js';
import fetchMock from 'fetch-mock';

describe('App componet unit testing', () => {

  let wrapper;

  const pause = () => {
    return new Promise(res => {
      setTimeout(() => {
        res();
      }, 0);
    });
  };

  beforeEach( async () => {
    fetchMock.get('https://swapi.co/api/films/', {
      status: 200,
      body: filmData
    });
    fetchMock.get('https://swapi.co/api/people/', {
      status: 200,
      body: mockData
    });
    fetchMock.get('https://swapi.co/api/vehicles/', {
      status: 200,
      body: vehicleData
    });
    fetchMock.get('https://swapi.co/api/planets/', {
      status: 200,
      body: planetData
    });

    wrapper = mount(<App />);

    await pause();

    wrapper.setState({ whichCrawler: Math.floor((Math.random() * 3) + 0) });
    wrapper.setState({ errorReturned: false });
    wrapper.setState({ currentView: 'People' });
    wrapper.setState({ filmArray: filmData });
    wrapper.setState({ peopleArray: mockData });
    wrapper.setState({ planetArray: planetData });
    wrapper.setState({ vehicleArray: vehicleData });
    wrapper.setState({ currentDataArray: mockData });
    wrapper.setState({ favoritesArray: favoriteData });
  });

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  test(`fetchMock should have been called`, () => {
    expect(fetchMock.called()).toEqual(true);
  });

  test(`should create an instance of App`, () => {
    expect(wrapper.exists()).toEqual(true);
  });

  test(`should save api call data to app.state data arrays`, () => {
    expect(wrapper.state().filmArray).toEqual(filmData);
    expect(wrapper.state().peopleArray).toEqual(mockData);
    expect(wrapper.state().planetArray).toEqual(planetData);
    expect(wrapper.state().vehicleArray).toEqual(vehicleData);
  });

  test(`should render an instance of Crawler with correct data
        and recieve correct props from App`, () => {
      const crawler = wrapper.find('Crawler');
      const pTag = crawler.find('p').at(1);
      const pTagText = pTag.text();

      expect(crawler.exists()).toEqual(true);

      expect(pTag.text()).toEqual(pTagText);

      expect(crawler.props().filmArray).toEqual(filmData);
      expect(crawler.props().whichCrawler).toEqual(wrapper.state().whichCrawler);
    });

  test(`should render an instance of CardContainer,
        CardContainer should create an instance of Card,
        and pass down correct data, onCardClick it should add/remove
        the card to favoritesArray in app.state, should
        recieve correct props from App`, () => {

      const cardContainer = wrapper.find('CardContainer');
      const card = cardContainer.find('Card').first();
      const span = card.find('span').at(3);
      const spanText = span.text();
      const article = card.find('article');

      expect(cardContainer.exists()).toEqual(true);
      expect(card.exists()).toEqual(true);

      expect(span.text()).toEqual(spanText);

      expect(article.hasClass('card')).toEqual(true);

      expect(cardContainer.props().currentDataArray).toEqual(mockData);
      expect(cardContainer.props().favoritesArray).toEqual(wrapper.state().favoritesArray);
      expect(cardContainer.props().currentView).toEqual(wrapper.state().currentView);

      expect(wrapper.state().favoritesArray.length).toEqual(2);

      expect(wrapper.state().favoritesArray).toEqual([
        { "homeworld": "Tatooine",
          "name": "Biggs Darklighter",
          "population": "200000",
          "species": "Human"
        },
        {
          "homeworld": "Stewjon",
          "name": "Obi-Wan Kenobi",
          "population": "unknown",
          "species": "Human"
        }
      ]);

      article.simulate('click');

      expect(wrapper.state().favoritesArray.length).toEqual(3);

      expect(wrapper.state().favoritesArray).toEqual([
        { "homeworld": "Tatooine",
          "name": "Biggs Darklighter",
          "population": "200000",
          "species": "Human"
        },
        {
          "homeworld": "Stewjon",
          "name": "Obi-Wan Kenobi",
          "population": "unknown",
          "species": "Human"
        },
        { "homeworld": "Tatooine",
          "name": "Luke Skywalker",
          "population": "200000",
          "species": "Human"}
      ]);

      article.simulate('click');

      expect(wrapper.state().favoritesArray.length).toEqual(2);

      expect(wrapper.state().favoritesArray).toEqual([
        { "homeworld": "Tatooine",
          "name": "Biggs Darklighter",
          "population": "200000",
          "species": "Human"
        },
        {
          "homeworld": "Stewjon",
          "name": "Obi-Wan Kenobi",
          "population": "unknown",
          "species": "Human"
        }
      ]);
    });

  test(`should render an instance of Controls,
        should pass down correct props, on button
        click; currentDataArray in App.state should
        be updated with data corresponding to button name`, () => {

      const controls = wrapper.find('Controls');
      const peopleBtn = controls.find('button').first();
      const planetBtn = controls.find('button').at(1);
      const vehiclesBtn = controls.find('button').at(2);
      const favoritesBtn = controls.find('button').at(3);

      expect(controls.exists()).toEqual(true);

      expect(controls.props().favoritesArray).toEqual(wrapper.state().favoritesArray);
      expect(controls.props().currentView).toEqual(wrapper.state().currentView);

      planetBtn.simulate('click');

      expect(wrapper.state().currentDataArray).toEqual(wrapper.state().planetArray);
      expect(wrapper.state().currentView).toEqual('Planets');

      vehiclesBtn.simulate('click');

      expect(wrapper.state().currentDataArray).toEqual(wrapper.state().vehicleArray);
      expect(wrapper.state().currentView).toEqual('Vehicles');

      favoritesBtn.simulate('click');

      expect(wrapper.state().currentDataArray).toEqual(wrapper.state().favoritesArray);
      expect(wrapper.state().currentView).toEqual('Favorites');

      peopleBtn.simulate('click');

      expect(wrapper.state().currentDataArray).toEqual(wrapper.state().peopleArray);
      expect(wrapper.state().currentView).toEqual('People');
    });
});
