import React from 'react';
import {shallow} from 'enzyme';

import {Link} from 'react-router-dom';

import GameManager from '../../../src/lib/game-manager';

import Home from '../../../src/components/routes/home.jsx';
import Rules from '../../../src/components/routes/components/rules.jsx';
import Button from '../../../src/components/shared/button.jsx';

describe('<Home />', () => {
  let home = null;
  let links = null;
  let buttons = null;

  beforeAll(() => {
    home = shallow(<Home/>);
    links = [...home.find(Link)];
    buttons = [...home.find(Button)];
  });

  test('should render the rules', () => {
    const rules = [...home.find(Rules)];

    expect(rules).toHaveLength(1);
  });

  test('should render a start game button', () => {
    const startButtons = buttons.filter(({props}) => props.children === 'Start Game');

    expect(startButtons).toHaveLength(1);

    const startButton = startButtons[0];

    expect(startButton.props.onClick).toEqual(GameManager.create);
  });

  test('should render a join game button', () => {
    const joinGameButton = links.filter(({props}) => props.to === '/game/join');

    expect(joinGameButton).toHaveLength(1);
  });
});
