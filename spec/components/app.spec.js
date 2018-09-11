import React from 'react';
import {shallow} from 'enzyme';

import App from '../../src/components/app.jsx';
import Header from '../../src/components/header.jsx';
import Main from '../../src/components/main.jsx';

describe('<App />', () => {
  let app = null;

  beforeAll(() => {
    app = shallow(<App/>);
  });

  test('should have a header', () => {
    expect(app.contains(<Header/>));
  });

  test('should have the main render component', () => {
    expect(app.contains(<Main/>));
  });
});
