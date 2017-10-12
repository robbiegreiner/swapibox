import React from 'react';
import ReactDOM from 'react-dom';
import Favorites from '../components/Favorites';
import { mount } from 'enzyme';
import config from '../setupTests.js';
import favoritesData from './favoriteMockData.js'

describe(`Favorites component unit testing`, () => {
  let wrapper;
  let div;
  let card;
  let li1;
  let li2;
  let li1text;
  let li2text;
  let favoritesArray;
  let mockFunc;

  beforeEach(() => {
    mockFunc = () => {};
    favoritesArray = favoritesData;
    wrapper = mount(
      <Favorites
        favoritesArray={favoritesArray}
        onFavoriteClick={mockFunc}
      />
    );
    div = wrapper.find('div');
    card= div.find('Card');
    li1 = card.find('li').first();
    li2 = card.find('li').at(1);
    li1text = li1.text();
    li2text = li2.text();
  });

  test(`should create an instance of Favorites`, () => {
    expect(wrapper.exists()).toEqual(true);
  });

  test(`should render a parent div element and two components of Card`, () => {
    expect(div.type()).toEqual('div');
    expect(card.first().exists()).toEqual(true);
    expect(card.length).toEqual(2);
  });

  test(`should render correct data`, () => {
    expect(li1.text()).toEqual(li1text);
    expect(li2.text()).toEqual(li2text);
  });


});
