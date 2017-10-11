import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../components/Card';
import { mount } from 'enzyme';
import config from '../setupTests.js';
import mockData from './mockData.js';

describe(`Card component unit testing`, () => {

let wrapper = [];
let mockFuncClick;
let mockFuncClass;
let article;
let ul;
let li;
let button;

  beforeEach(() => {
    mockFuncClick = () => {};
    mockFuncClass = () => {};
    mockData.map((object, index) => {
      let objects = mount(
        <Card
          key={index}
          object={object}
          onFavoriteClick={mockFuncClick}
          activeClass='active' />);
      wrapper.push(objects);
    });
    article = wrapper[0].find('article');
    ul = article.find('ul');
    li = ul.find('li').first();
    button = article.find('button');
  });

  test(`should create an instance of Card component`, () => {
    for (let i = 0; i < wrapper.length; i++) {
      expect(wrapper[i].exists()).toEqual(true);
    }
  });

  test(`should render an article tag, ul tag, and li tags, and button tag`, () => {
    expect(article.type()).toEqual('article');
    expect(ul.type()).toEqual('ul');
    expect(li.type()).toEqual('li');
    expect(button.type()).toEqual('button');
  });

  test(`should render correct node element`, () => {
    expect(button.contains(<button>Favorite</button>)).toEqual(true);
    expect(li.contains(<li><span>homeworld: </span>Tatooine</li>)).toEqual(true);
  });

  test(`article should be parent container`, () => {
    expect(button.parent().is('article')).toEqual(true);
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
