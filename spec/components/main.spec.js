import React from 'react';
import {shallow} from 'enzyme';
import {Switch, Route} from 'react-router-dom';

import Main from '../../src/components/main.jsx';
import Home from '../../src/components/routes/home.jsx';

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
  });

  test('should have Home route that renders Home component exactly on /', () => {
    const homeRoute = routes.filter(({props}) => props.path === '/')[0];

    expect(homeRoute.props.component).toEqual(Home);
    expect(homeRoute.props.exact).toEqual(true);
  });
});
