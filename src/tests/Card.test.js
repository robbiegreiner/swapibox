import React from 'react';
import Card from '../components/Card';
import { mount } from 'enzyme';
import mockData from './mockData.js';
import 'jest';

describe(`Card component unit testing`, () => {

  let wrapper = [];
  let mockFuncClick;
  let article;
  let ul;
  let li;

  beforeEach(() => {
    mockFuncClick = jest.fn(() => {});
    mockData.map((object, index) => {
      let objects = mount(
        <Card
          key={index}
          cardObject={object}
          setFavorite={mockFuncClick}
          activeClass='active' />);
      wrapper.push(objects);
    });
    article = wrapper[0].find('article');
    ul = article.find('ul');
    li = ul.find('li').first();
  });

  test(`should create an instance of Card component, 7 in total`, () => {
    wrapper.forEach( card => {
      expect(card.exists()).toEqual(true);
    });
    expect(wrapper.length).toEqual(7);
  });

  test(`should render an article tag, ul tag, and li tags,`, () => {
    expect(article.type()).toEqual('article');
    expect(ul.type()).toEqual('ul');
    expect(li.type()).toEqual('li');
  });

  test(`should render correct node element`, () => {
    expect(li.contains(<li className="homeworld">
      <span className="homeworld">homeworld: </span>
      <span className="homeworld1">Tatooine</span>
    </li>)).toEqual(true);
  });

  test(`article should be parent container`, () => {
    expect(ul.parent().is('article')).toEqual(true);
  });

  test(`should render correct information`, () => {
    expect(li.text()).toEqual('homeworld: Tatooine');
    expect(ul.find('li').at(3).text()).toEqual('species: Human');
  });

  test(`should have correct className`, () => {
    expect(article.hasClass('active')).toEqual(true);
  });
});
