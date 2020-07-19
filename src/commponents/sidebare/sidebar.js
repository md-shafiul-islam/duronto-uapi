import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <Col sm={3}>
          <p>Side Bar</p>
        </Col>
      </React.Fragment>
    );
  }
}

export default Sidebar;
