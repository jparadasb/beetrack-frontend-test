import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

require('./styles.scss');

const Button = props => (
  <button
    type="button"
    className={`btn ${props.className}`}
    onClick={props.onClick}
  >
    <FontAwesome
      name="plus-circle"
      className="icon"
    />
    <span className="button-text">
      {props.buttonText}
    </span>
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: 'btn-default',
};

export default Button;
