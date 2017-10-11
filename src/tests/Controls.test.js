import React from 'react';
import ReactDOM from 'react-dom';
import Controls from '../components/Controls';
import { mount } from 'enzyme';
import config from '../setupTests.js';
import mockData from './mockData.js';
import favoriteData from './favoriteMockData.js';

describe('Controls component unit testing', () => {
  let wrapper;
  let mockFuncClick;

  beforeEach(() => {
    wrapper = mount(
      <Controls
        onClick={mockFuncClick}
      />
    );
  });

  test(`should create an instance of Controls`, () => {
    expect(wrapper.exists()).toEqual(true);
  });
});
