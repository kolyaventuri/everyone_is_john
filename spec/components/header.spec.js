import React from 'react';
import {Link} from 'react-router-dom';
import {shallow} from 'enzyme';

import Header from '../../src/components/header.jsx';

describe('<Header />', () => {
  let header = null;

  beforeAll(() => {
    header = shallow(<Header/>);
  });

  test('should have a link to home', () => {
    const links = header.find(Link);
    const homeLink = links.filter(link => link.props().to === '/');

    expect(homeLink).toBeDefined();
  });
});
