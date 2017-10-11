import React from 'react';
import ReactDOM from 'react-dom';
import Crawler from '../components/Crawler';
import { mount } from 'enzyme';
import config from '../setupTests.js';
// import mockData from './mockData.js';
// import favoriteData from './favoriteMockData.js';


describe(`Controls component unit testing`, () => {
  let wrapper;
  let filmArray;
  let whichCrawler;

  beforeEach(() => {
    wrapper = mount(
      <Crawler
        filmArray={filmArray}
        whichCrawler={whichCrawler}
      />
    );
  });

  test(`should create an instance of Crawler`, () => {
    expect(wrapper.exists()).toEqual(true);
  });
});
