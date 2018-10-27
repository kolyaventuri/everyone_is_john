import React from 'react';
import PropTypes from 'prop-types';

import Box from './box.jsx';

export default class Slider extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired
  }

  render() {
    const {value} = this.props;

    let i = 0;
    return new Array(value).fill(null).map(() => {
      return <Box key={i++}/>;
    });
  }
}
