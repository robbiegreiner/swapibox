import React from 'react';
import ReactDOM from 'react-dom';
import CardContainer from '../components/CardContainer';
import { mount } from 'enzyme';
import config from '../setupTests.js';
import mockData from './mockData.js';
import favoriteData from './favoriteMockData.js';

describe(`CardContainer component unit testing`, () => {
  let wrapper;
  let mockFuncClick;

  beforeEach(() => {
    mockFuncClick = () => {};
    wrapper = mount(
      <CardContainer
        array={mockData}
        favoritesArray={favoriteData}
        onFavoriteClick={mockFuncClick}
      />);
  });

  test(`should create an instance of CardContainer`, () => {
    expect(wrapper.exists()).toEqual(true);
  });
});
