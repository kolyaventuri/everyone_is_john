import React from 'react';
import {shallow} from 'enzyme';

import JoinGame from '../../../src/components/routes/join-game.jsx';

describe('<JoinGame />', () => {
  test('renders', () => {
    const wrapper = shallow(<JoinGame/>);

    expect(wrapper.contains(<div/>)).toEqual(true);
  });
});
