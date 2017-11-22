import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BeetrackTitle from '../../components/beetrack-title';
import SearchBox from '../../components/search-box';
import Button from '../../components/button';

require('font-awesome/css/font-awesome.css');
require('./styles.scss');

const mapStateToProps = ({ contactsListState }) => ({ contactsListState });

class ContactsListContainer extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col>
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
              onChange={console.log}
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
      </Grid>
    );
  }
}

export default connect(mapStateToProps, null)(ContactsListContainer);
