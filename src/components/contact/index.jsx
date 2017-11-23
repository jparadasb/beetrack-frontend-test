import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Loading from '../loading/';

require('./styles.scss');

class Contact extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      deleteLoading: false,
    };
  }

  setLoading(isActive) {
    this.setState({
      deleteLoading: isActive,
    });
  }

  handleDelete() {
    this.setLoading(false);
    return this.props.deleteContact(this.props.id)
      .then(() => this.setLoading(true));
  }

  renderDeleteButton() {
    if (this.state.deleteLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    return (
      <div
        onClick={this.handleDelete}
        onKeyPress={console.log}
        role="button"
        tabIndex={this.props.id}
        className="delete"
      >
        Eliminar
      </div>
    );
  }

  render() {
    return (
      <Col
        xs={12}
        className="contact"
      >
        <Row
          middle="xs"
        >
          <Col
            xs={4}
          >
            <section
              className="profile-container"
            >
              <aside
                className="profile"
              >
                <img
                  className="photo"
                  src={this.props.photo}
                  alt={this.props.name}
                />
              </aside>
              <aside
                className="info"
              >
                <span>
                  {this.props.name}
                  {this.renderDeleteButton()}
                </span>
              </aside>
            </section>
          </Col>
          <Col
            xs={8}
          >
            <section
              className="description"
            >
              {this.props.description}
            </section>
          </Col>
        </Row>
      </Col>
    );
  }
}

Contact.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;
