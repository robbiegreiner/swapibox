import React from 'react';
import ReactDOM from 'react-dom';
import Crawler from '../components/Crawler';
import { mount } from 'enzyme';
import config from '../setupTests.js';
import filmData from './filmMockData.js';
import 'jest';

describe(`Controls component unit testing`, () => {
  let wrapper;
  let filmArray;
  let whichCrawler;
  let div1;
  let div2;
  let div3;
  let p1;
  let p2;
  let p3;
  let p1text;
  let p2text;
  let p3text;

  beforeEach(() => {

    whichCrawler = Math.floor((Math.random() * 3) + 0);
    filmArray = filmData;
    wrapper = mount(
      <Crawler
        filmArray={filmArray}
        whichCrawler={whichCrawler}
      />
    );

    div1 = wrapper.find('div').first();
    div2 = wrapper.find('div').at(1);
    div3 = wrapper.find('div').at(2);

    p1 = div3.find('p').first();
    p2 = div3.find('p').at(1);
    p3 = div3.find('p').at(2);

    p1text = p1.text();
    p2text = p2.text();
    p3text = p3.text();
  });

  test(`should create an instance of Crawler`, () => {
    expect(wrapper.exists()).toEqual(true);
  });

  test(`should render div elements and p elements`, () => {
    expect(div1.exists()).toEqual(true);
    expect(div2.exists()).toEqual(true);
    expect(div3.exists()).toEqual(true);

    expect(p1.exists()).toEqual(true);
    expect(p2.exists()).toEqual(true);
    expect(p3.exists()).toEqual(true);
  });

  test(`top parent node should be div with className crawl-container`, () => {
    const parent = div2.parent();
    expect(parent.is('div')).toEqual(true);
    expect(parent.hasClass('crawl-container')).toEqual(true);
  });

  test(`should render correct information`, () => {
    expect(p1.text()).toEqual(p1text);
    expect(p2.text()).toEqual(p2text);
    expect(p3.text()).toEqual(p3text);
  });

  test(`should render with correct classNames`, () => {
    expect(div1.hasClass('crawl-container')).toEqual(true);
    expect(div2.hasClass('star-wars')).toEqual(true);
    expect(div3.hasClass('crawl')).toEqual(true);

    expect(p1.hasClass('crawl-text')).toEqual(true);
    expect(p2.hasClass('film-title')).toEqual(true);
    expect(p3.hasClass('release-date')).toEqual(true);
  });
});
