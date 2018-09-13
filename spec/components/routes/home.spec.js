import React from 'react';
import {shallow} from 'enzyme';

import Home from '../../../src/components/routes/home.jsx';
import Rules from '../../../src/components/routes/components/rules.jsx';

describe('<Home />', () => {
  let home = null;

  beforeAll(() => {
    home = shallow(<Home/>);
  });

  test('should render the rules', () => {
    const rules = [...home.find(Rules)];

    expect(rules).toHaveLength(1);
  });
});
