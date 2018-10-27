import React from 'react';

import {mount} from 'enzyme';

import SliderBox from '../../../../src/components/game/willpower/box.jsx';

describe('<Box/>', () => {
  xtest('sets background color based on willpower value and max willpower', () => {
    const max = 10;
    const value = 8;
    const expectedColor = null;

    const wrapper = mount(<SliderBox value={value} max={max}/>);

    expect(wrapper.state().bgColor).toEqual(expectedColor);
  });
});
