import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import BeetrackTitle from '../../components/beetrack-title';
import AddContactForm from '../../components/add-contact-form/';
import SearchBox from '../../components/search-box';
import Button from '../../components/button';
import Contact from '../../components/contact';
import Header from '../../components/header';

import { getAllContacts, setSearchboxFilter, deleteContact, addNewContact } from '../../actions';

require('font-awesome/css/font-awesome.css');
require('./styles.scss');

const mapStateToProps = ({ contactsListState }) => ({ ...contactsListState });

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllContacts,
  setSearchboxFilter,
  deleteContact,
  addNewContact,
}, dispatch);

class ContactsListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSearchBoxFilter = this.handleSearchBoxFilter.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);

    this.state = {
      modalIsOpen: false,
      disabledNext: false,
      disabledPrev: false,
    };
  }
  componentDidMount() {
    this.props.getAllContacts(this.props.page);
  }

  setDisabledNext(disabledNext = true, cb = () => {}) {
    this.setState({
      disabledNext,
    }, cb);
  }

  setDisabledPrev(disabledPrev = true, cb = () => {}) {
    this.setState({
      disabledPrev,
    }, cb);
  }

  isNextDisabled() {
    return (!this.props.canGoNext || this.state.disabledNext);
  }

  isPrevDisabled() {
    return (!this.props.canGoPrev || this.state.disabledPrev);
  }

  handleNextPage() {
    this.setDisabledNext(true, () => {
      this.props.getAllContacts(this.props.page + 1)
        .then(() => this.setDisabledNext(false));
    });
  }

  handlePrevPage() {
    this.setDisabledPrev(true, () => {
      this.props.getAllContacts(this.props.page - 1)
        .then(() => this.setDisabledPrev(false));
    });
  }

  handleSearchBoxFilter(filter) {
    this.props.setSearchboxFilter(filter);
  }

  handleToggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <div
          className="error-message"
        >
          {this.props.errors}
        </div>
      );
    }
    return null;
  }

  renderContacts() {
    return this.props.contacts
      .filter(elm => (elm.name.indexOf(this.props.filterText) !== -1))
      .map(contact => (
        <Contact
          key={contact.id}
          deleteContact={this.props.deleteContact}
          {...contact}
        />
      ));
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <BeetrackTitle />
          </Col>
        </Row>
        <Row
          between="xs"
        >
          <Col
            xs={5}
            lg={3}
          >
            <SearchBox
              onChange={this.handleSearchBoxFilter}
            />
          </Col>
          <Col
            xs={5}
            lg={2}
          >
            <Button
              className="btn-add-contact"
              buttonText="Nuevo Contacto"
              onClick={this.handleToggleModal}
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
          >
            <section
              className="contacts-list"
            >
              <Header />
              {this.renderErrors()}
              {this.renderContacts()}
            </section>
          </Col>
        </Row>
        <Row
          middle="xs"
        >
          <Col
            xs={6}
          >
            <div
              onClick={this.isPrevDisabled() ? () => {} : this.handlePrevPage}
              className="text-left"
              role="button"
              tabIndex={-1}
            >
              <span
                className={`paginate-action left ${this.isPrevDisabled() ? 'disabled' : ''}`}
              >
                <FontAwesome
                  size="2x"
                  name="chevron-circle-left"
                  className="icon-paginate"
                />
                <span
                  className="text-action"
                >
                  Anterior
                </span>
              </span>
            </div>
          </Col>
          <Col
            xs={6}
          >
            <div
              onClick={this.isNextDisabled() ? () => {} : this.handleNextPage}
              className="text-right"
              role="button"
              tabIndex={-1}
            >
              <span
                className={`paginate-action right ${this.isNextDisabled() ? 'disabled' : ''}`}
              >
                <span
                  className="text-action"
                >
                  Siguiente
                </span>
                <FontAwesome
                  size="2x"
                  name="chevron-circle-right"
                  className="icon-paginate"
                />
              </span>
            </div>
          </Col>
        </Row>
        <Modal
          className="new-contact-modal"
          onRequestClose={this.handleToggleModal}
          isOpen={this.state.modalIsOpen}
        >
          <header
            className="modal-header"
          >
            Agregar nuevo contacto
          </header>
          <AddContactForm
            toggleModal={this.handleToggleModal}
            handleSubmit={this.props.addNewContact}
          />
        </Modal>
      </Grid>
    );
  }
}

const contact = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.string,
});

ContactsListContainer.propTypes = {
  getAllContacts: PropTypes.func.isRequired,
  setSearchboxFilter: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(contact),
  filterText: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
  addNewContact: PropTypes.func.isRequired,
  page: PropTypes.number,
  errors: PropTypes.string,
  canGoNext: PropTypes.bool,
  canGoPrev: PropTypes.bool,
};

ContactsListContainer.defaultProps = {
  contacts: [],
  page: 1,
  errors: '',
  canGoNext: true,
  canGoPrev: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListContainer);
