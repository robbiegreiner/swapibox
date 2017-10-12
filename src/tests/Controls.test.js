import React from 'react';
import Controls from '../components/Controls';
import { mount } from 'enzyme';
import favoriteData from './favoriteMockData';
import Jest from 'jest';

describe('Controls component unit testing', () => {
  let wrapper;
  let mockFunc;
  let div;
  let button;
  let favoritesArray;

  beforeEach(() => {
    mockFunc = jest.fn(() => {});
    favoritesArray = favoriteData;
    wrapper = mount(
      <Controls
        onClick={mockFunc}
        favoritesArray={favoritesArray}
        currentView='People'
      />
    );
    div = wrapper.find('div');
    button = div.find('button');
  });

  test(`should create an instance of Controls`, () => {
    expect(wrapper.exists()).toEqual(true);
  });

  test(`should render a parent div four button nodes`, () => {
    expect(div.type()).toEqual('div');
    expect(button.first().type()).toEqual('button');
    expect(button.length).toEqual(4);
  });

});
