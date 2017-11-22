import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BeetrackTitle from '../../components/beetrack-title';

require('./styles.scss');

const mapStateToProps = ({ usersListState }) => ({ usersListState });

class UsersListContainer extends Component {
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
      </Grid>
    );
  }
}

export default connect(mapStateToProps, null)(UsersListContainer);
