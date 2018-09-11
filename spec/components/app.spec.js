import React from 'react';
import {shallow} from 'enzyme';

import App from '../../src/components/app.jsx';

describe('<App />', () => {
  test('should render', () => {
    const app = shallow(<App/>);

    expect(app).toContainReact(<div>Hello</div>);
  });
});
