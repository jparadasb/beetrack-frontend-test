import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

const Header = () => (
  <Col
    xs={12}
    className="header"
  >
    <Row>
      <Col
        xs={4}
      >
        <div
          className="name"
        >
          Nombre
        </div>
      </Col>
      <Col
        xs={8}
      >
        <div
          className="description"
        >
          Descripción
        </div>
      </Col>
    </Row>
  </Col>
);

export default Header;
