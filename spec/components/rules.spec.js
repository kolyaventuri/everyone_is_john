import React from 'react';
import {shallow} from 'enzyme';

import Rules from '../../src/components/rules.jsx';

describe('<Rules />', () => {
  test('renders a div', () => {
    const wrapper = shallow(<Rules/>);

    expect(wrapper.contains(<div/>)).toEqual(true);
  });
});
