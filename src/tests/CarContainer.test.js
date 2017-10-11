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
  let div;
  let card;
  let li1;
  let li2;
  let li1text;
  let li2text;

  beforeEach(() => {
    mockFuncClick = () => {};
    wrapper = mount(
      <CardContainer
        currentDataArray={mockData}
        favoritesArray={favoriteData}
        onFavoriteClick={mockFuncClick}
      />);
    div = wrapper.find('div');
    card = div.find('Card');
    li1 = card.find('li').first();
    li2 = card.find('li').at(2);

    li1text = li1.text();
    li2text = li2.text();
  });

  test(`should create an instance of CardContainer`, () => {
    expect(wrapper.exists()).toEqual(true);
  });

  test(`should render a div parent component`, () => {
    expect(div.type()).toEqual('div');
    expect(card.first().parent()).toEqual(div);
  });

  test(`should render multiple instances of Card`, () => {
    expect(card.first().exists()).toBe(true);
    expect(card.length).toEqual(7);
  });

  test(`should render correct data`, () => {
    expect(li1.text()).toEqual(li1text);
    expect(li2.text()).toEqual(li2text);
  });
});
