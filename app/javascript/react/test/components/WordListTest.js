import WordList from '../../src/components/WordList';
import React from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

describe('A test for WordList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<WordList
                      wordArray={['this', 'is', 'a', 'test', 'TOTAL']}
                      invalidWordIds={[1, 3]}
                    />)
  })

  it('should render a single unordered list with 4 elements', () => {
    // expect(wrapper.find('ul').text()).toEqual("Hello World")
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(5);
  })

  it('should have an unordered list with the correct element values', () => {
    expect(wrapper.find('li').at(0).text()).toEqual('this');
    expect(wrapper.find('li').at(1).text()).toEqual('is');
    expect(wrapper.find('li').at(2).text()).toEqual('a');
    expect(wrapper.find('li').at(3).text()).toEqual('test');
    expect(wrapper.find('li').at(4).text()).toEqual('TOTAL');

  })

  it('should have an unordered list where the 2nd and 4th list elements have the class name "invalid-word"', () => {
    expect(wrapper.find('li.invalid-word').length).toEqual(2);
    expect(wrapper.find('li.invalid-word').at(0).text()).toEqual('is');
    expect(wrapper.find('li.invalid-word').at(1).text()).toEqual('test');
  })

  it('should have an unordered list where the list element containing the string "TOTAL" has the class name "total-points"', () => {
    expect(wrapper.find('li.total-points').length).toEqual(1);
    expect(wrapper.find('li.total-points').at(0).text()).toEqual('TOTAL');
  })
})
