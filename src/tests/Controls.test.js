import React from 'react';
import ReactDOM from 'react-dom';
import Controls from '../components/Controls';
import { mount } from 'enzyme';
import config from '../setupTests.js';

describe('Controls component unit testing', () => {
  let wrapper;
  let mockFuncClick;
  let div;
  let button;

  beforeEach(() => {
    wrapper = mount(
      <Controls
        onClick={mockFuncClick}
      />
    );
    div = wrapper.find('div');
    button = div.find('button');
  });

  test(`should create an instance of Controls`, () => {
    expect(wrapper.exists()).toEqual(true);
  });

  test(`should render a parent div three button nodes`, () => {
    expect(div.type()).toEqual('div');
    expect(button.first().type()).toEqual('button');
    expect(button.length).toEqual(3);
  });

});
