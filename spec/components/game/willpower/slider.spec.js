import React from 'react';

import {shallow} from 'enzyme';

import Slider from '../../../../src/components/game/willpower/slider.jsx';
import SliderBox from '../../../../src/components/game/willpower/box.jsx';

describe('<WillpowerSlider />', () => {
  test('renders the amount of willpower boxes provided', () => {
    const numWillpower = 10;
    const wrapper = shallow(<Slider value={numWillpower}/>);

    const boxes = wrapper.find(SliderBox);

    expect(boxes).toHaveLength(numWillpower);
  });
});
