import React, { Component } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

class TopNavBar extends Component {
  render() {
    return (
      <Row>
        <Container>
          <Col md={{span:8, offset:2}} >
            <Nav activeKey="/flights">
              <Nav.Item>
                <Nav.Link href="/flights" eventKey="flights" className="m-item">
                  <i className=" menu-icon fas fa-plane-departure"></i><span className="menu-text">Flights</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/hotels" eventKey="hotels" className="m-item">
                <i className="menu-icon fas fa-hotel"></i> <span className="menu-text">Hotels</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/travels" eventKey="travels" className="m-item">
                <i className="menu-icon fas fa-route"></i><span className="menu-text">Travels</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Container>
      </Row>
    );
  }
}

export default TopNavBar;
