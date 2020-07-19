import React, { Component } from "react";

export default class mainContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm={12}>
              <Row></Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
