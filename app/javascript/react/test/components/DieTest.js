import Die from '../../src/components/Die';
import React from 'react'
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

describe('A test for Die', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Die
                      key={ 0 }
                      id={ 1 }
                      dieData={ {id: 1, letter: 't'} }
                      selectedIds={ [1] }
                      currentId={ 1 }
                      mouseOverData={ {id: 1, isValid: false} }
                    />)
  })

  it('should render a single div with the correct letter', () => {
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div').at(0).text()).toEqual('t');
  })

  it('should render a div with the class name "selected" when the die is part of the current word', () => {
    expect(wrapper.find('div.selected').length).toEqual(1);
  })

  it('should render a div with the class name "current" when the die is most recently selected', () => {
    expect(wrapper.find('div.current').length).toEqual(1);
  })

  it('should render a div with the class name "mouseover-invalid" when the die is moused-over (because it has already been selected)', () => {
    expect(wrapper.find('div.mouseover-invalid').length).toEqual(1);
  })

  // it('should have an unordered list with the correct element values', () => {
  //   expect(wrapper.find('li').at(0).text()).toEqual('this');
  //   expect(wrapper.find('li').at(1).text()).toEqual('is');
  //   expect(wrapper.find('li').at(2).text()).toEqual('a');
  //   expect(wrapper.find('li').at(3).text()).toEqual('test');
  // })
})
