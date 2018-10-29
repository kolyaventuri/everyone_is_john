import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Color from '../../../lib/color';
import Number from './number.jsx';

const initialColors = [
  [0, 100, 50],
  [120, 100, 50]
];

const color = new Color(...initialColors);

export default class Box extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }

  state = {
    bgColor: [0, 100, 100]
  }

  componentDidMount() {
    const {value, max} = this.props;
    const bgColor = color.calculate(value / max);

    this.setState({bgColor});
  }

  render() {
    const [h, s, l] = this.state.bgColor;
    const background = `hsl(${h}, ${s}%, ${l}%)`;
    const Container = styled.div`
      background-color: ${background};
    `;

    return (
      <Container>
        <Number value={this.props.value}/>
      </Container>
    );
  }
}
