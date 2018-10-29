import React from 'react';

import {mount} from 'enzyme';

import SliderBox from '../../../../src/components/game/willpower/box.jsx';

describe('<Box/>', () => {
  let wrapper;
  let expectedColor;
  let max;
  let value;
  let expectedStyle;

  beforeEach(() => {
    max = 10;
    value = 8;
    expectedColor = [96, 100, 50]; // 120 * 80% = 96
    expectedStyle = 'hsl(96,100%,50%)';

    wrapper = mount(<SliderBox value={value} max={max}/>);
  });

  test('sets background color based on willpower value and max willpower', () => {
    expect(wrapper.state().bgColor).toEqual(expectedColor);
  });

  test('sets CSS background color', () => {
    expect(wrapper).toHaveStyleRule('background-color', expectedStyle);
  });

  test('contains the willpower number in the component', () => {
    const numbers = wrapper.find('Number');

    expect(numbers).toHaveLength(1);
    expect(wrapper.text()).toContain(value);
  });
});
