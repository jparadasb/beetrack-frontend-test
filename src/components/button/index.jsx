import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Loading from '../loading';

require('./styles.scss');

const renderIcon = (iconName) => {
  if (iconName) {
    return (
      <FontAwesome
        name={iconName}
        className="icon"
      />
    );
  }
  return null;
};

const Button = props => (
  <button
    type="button"
    disabled={props.disabled}
    className={`btn ${props.className}`}
    onClick={props.loading || props.disabled ? () => {} : props.onClick}
  >
    {renderIcon(props.iconName)}
    <span className="button-text">
      {props.loading ? <Loading /> : props.buttonText }
    </span>
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
  iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: 'btn-default',
  iconName: 'plus-circle',
  loading: false,
  disabled: false,
};

export default Button;
