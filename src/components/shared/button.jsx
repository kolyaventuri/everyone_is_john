import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.props.onClick;
  }

  render() {
    return (
      <div className="button">
        { this.props.children }
      </div>
    );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func
};

Button.defaultProps = {
  children: null,
  onClick: null
};

export default Button;
