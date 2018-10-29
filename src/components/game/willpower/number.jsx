import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.p`
  font-weight: bold;
  font-size: 2em;
`;

const Number = ({value}) => <Container>{value}</Container>;

Number.propTypes = {
  value: PropTypes.number.isRequired
};

export default Number;
