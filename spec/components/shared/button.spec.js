import React from 'react';

import {shallow} from 'enzyme';

import Button from '../../../src/components/shared/button.jsx';

describe('<Button />', () => {
  test('should take an arbitrary child', () => {
    const button1 = shallow(<Button>Test</Button>);
    const button2 = shallow(<Button><p>T2</p></Button>);

    expect(button1.props().children).toEqual('Test');
    expect(button2.props().children).toEqual(<p>T2</p>);
  });
});
