import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

import Button from '../button';

require('./styles.scss');

const ERRORS = {
  INVALID_URL: 'El formato de la url es invalido.',
  EMPTY_FIELD: field => (`El campo ${field} está vacío`),
};

const INPUTS = {
  NAME: 'name',
  PHOTO: 'photo',
  DESCRIPTION: 'description',
};

const renderRequired = () => (
  <span
    className="red-highlight"
  >
    *
  </span>
);

class AddContactForm extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);

    this.state = {
      loading: false,
      name: {
        value: null,
        error: null,
      },
      photo: {
        value: null,
        error: null,
      },
      description: {
        value: null,
        error: null,
      },
    };
  }

  setLoading(isLoading, cb = () => {}) {
    this.setState({
      loading: isLoading,
    }, cb);
  }

  getErrorClass(property) {
    return this.state[property].error ? 'input-with-errors' : '';
  }

  updateState(metaObject) {
    return this.setState({
      ...this.state,
      ...metaObject,
    });
  }

  isDisabledForm() {
    const { name, photo, description } = this.state;
    const error = [name, photo, description].find(elm => (elm.error || !elm.value));
    return !!error;
  }

  handleSubmitForm() {
    const { name, photo, description } = this.state;
    this.setLoading(true);
    this.props.handleSubmit({
      name,
      description,
      photo,
    })
      .then(() => this.setLoading(false, this.props.toggleModal));
  }

  handleUpdateForState(property, value) {
    const metaObject = {};
    const pattern = /^(http|https):\/\/[^ "]+$/;
    metaObject[property] = {
      value,
      error: value === '' ? ERRORS.EMPTY_FIELD(property) : '',
    };

    if (
      property === INPUTS.PHOTO &&
      !pattern.test(value)
    ) {
      metaObject[property] = {
        ...metaObject[property],
        error: value === '' ? ERRORS.EMPTY_FIELD(property) : ERRORS.INVALID_URL,
      };
    }

    return this.updateState(metaObject);
  }

  handleOnChange(event) {
    this.handleUpdateForState(event.target.id, event.target.value);
  }

  renderErros(property) {
    return (
      <span
        className="error-message"
      >
        {this.state[property].error}
      </span>
    );
  }

  render() {
    return (
      <Col
        xs={12}
      >
        <Row
          center="xs"
          middle="xs"
        >
          <Col
            xs={10}
          >
            <form
              className="form add-contact-form"
              onSubmit={this.props.handleSubmit}
            >
              <div className="form-label">
                <label htmlFor={INPUTS.PHOTO}>
                  URL Imagen de perfil
                  {renderRequired()}
                  {this.renderErros(INPUTS.PHOTO)}
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  className={`${this.getErrorClass(INPUTS.PHOTO)}`}
                  id={INPUTS.PHOTO}
                  onBlur={this.handleOnChange}
                />
              </div>
              <div className="form-label">
                <label htmlFor={INPUTS.NAME}>
                  Nombre
                  {renderRequired()}
                  {this.renderErros(INPUTS.NAME)}
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  className={`${this.getErrorClass(INPUTS.NAME)}`}
                  id={INPUTS.NAME}
                  onBlur={this.handleOnChange}
                />
              </div>
              <div className="form-label">
                <label htmlFor={INPUTS.DESCRIPTION}>
                  Descripción
                  {renderRequired()}
                  {this.renderErros(INPUTS.DESCRIPTION)}
                </label>
              </div>
              <div className="form-input">
                <textarea
                  type="text"
                  className={`${this.getErrorClass(INPUTS.DESCRIPTION)}`}
                  id={INPUTS.DESCRIPTION}
                  onBlur={this.handleOnChange}
                />
              </div>
              <Button
                iconName={false}
                buttonText="Guardar"
                className="btn-save-contact"
                disabled={this.isDisabledForm()}
                onClick={this.handleSubmitForm}
              />
            </form>
          </Col>
        </Row>
      </Col>
    );
  }
}

AddContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func,
};

AddContactForm.defaultProps = {
  toggleModal: () => {},
};

export default AddContactForm;
