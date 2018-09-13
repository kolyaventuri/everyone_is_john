import React from 'react';
import {shallow} from 'enzyme';

import {Link} from 'react-router-dom';

import Home from '../../../src/components/routes/home.jsx';
import Rules from '../../../src/components/routes/components/rules.jsx';

describe('<Home />', () => {
  let home = null;
  let links = null;

  beforeAll(() => {
    home = shallow(<Home/>);
    links = [...home.find(Link)];
  });

  test('should render the rules', () => {
    const rules = [...home.find(Rules)];

    expect(rules).toHaveLength(1);
  });

  test('should render a start game button', () => {
    const startGameButton = links.filter(({props}) => props.to === '/game/new');

    expect(startGameButton).toHaveLength(1);
  });

  test('should render a join game button', () => {
    const joinGameButton = links.filter(({props}) => props.to === '/game/join');

    expect(joinGameButton).toHaveLength(1);
  });
});
