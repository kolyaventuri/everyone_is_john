import React from 'react';
import {shallow} from 'enzyme';
import {Switch, Route} from 'react-router-dom';

import Main from '../../src/components/main.jsx';
import Home from '../../src/routes/home.jsx';

import JoinGame from '../../src/routes/join-game.jsx';

describe('<Main />', () => {
  let main = null;
  let routes = null;

  beforeAll(() => {
    main = shallow(<Main/>);
    routes = [...main.find(Route)];
  });

  test('should have a switch', () => {
    const switches = [...main.find(Switch)];

    expect(switches).toHaveLength(1);
  });

  test('should have Home route', () => {
    const homeRoutes = routes.filter(({props}) => {
      return props.path === '/';
    });

    expect(homeRoutes).toHaveLength(1);

    const homeRoute = homeRoutes[0];

    expect(homeRoute.props.component).toEqual(Home);
    expect(homeRoute.props.exact).toEqual(true);
  });

  test('should have a JoinGame route', () => {
    const gameRoutes = routes.filter(({props}) => props.path === '/game/join');

    expect(gameRoutes).toHaveLength(1);

    const joinRoute = gameRoutes[0];

    expect(joinRoute.props.exact).toEqual(true);
    expect(joinRoute.props.component).toEqual(JoinGame);
  });
});
