import React from 'react';
import PropTypes from 'prop-types';

export default class TextBox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  render() {
    const {onChange, value} = this.props;

    return (
      <input type="text" value={value} onChange={onChange}/>
    );
  }
}
