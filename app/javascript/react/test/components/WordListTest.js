import WordList from '../../src/components/WordList';
import React from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

describe('A test for WordList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<WordList wordArray={['this', 'is', 'a', 'test']}/>)
  })

  it('should render an unordered list', () => {
    // expect(wrapper.find('ul').text()).toEqual("Hello World")
    expect(wrapper.find('ul').length).toEqual(1);
  })
})
