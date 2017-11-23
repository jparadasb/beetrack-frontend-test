import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BeetrackTitle from '../../components/beetrack-title';
import SearchBox from '../../components/search-box';
import Button from '../../components/button';
import Contact from '../../components/contact';
import Header from '../../components/header';
import { getAllContacts, setSearchboxFilter, deleteContact } from '../../actions';

require('font-awesome/css/font-awesome.css');
require('./styles.scss');

const mapStateToProps = ({ contactsListState }) => ({ ...contactsListState });

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllContacts,
  setSearchboxFilter,
  deleteContact,
}, dispatch);

class ContactsListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSearchBoxFilter = this.handleSearchBoxFilter.bind(this);
  }
  componentDidMount() {
    this.props.getAllContacts();
  }

  handleSearchBoxFilter(filter) {
    this.props.setSearchboxFilter(filter);
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
              onClick={console.log}
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
              {this.renderContacts()}
            </section>
          </Col>
        </Row>
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
};

ContactsListContainer.defaultProps = {
  contacts: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListContainer);
