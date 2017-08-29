import WordList from '../../src/components/WordList';
import React from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

describe('A test for WordList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<WordList
                      wordArray={['this', 'is', 'a', 'test']}
                      invalidWordIds={[2, 4]}
                    />)
  })

  it('should render a single unordered list with 4 elements', () => {
    // expect(wrapper.find('ul').text()).toEqual("Hello World")
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(4);
  })

  it('should have an unordered list with the correct element values', () => {
    expect(wrapper.find('li').at(0).text()).toEqual('this');
    expect(wrapper.find('li').at(1).text()).toEqual('is');
    expect(wrapper.find('li').at(2).text()).toEqual('a');
    expect(wrapper.find('li').at(3).text()).toEqual('test');
  })
})
