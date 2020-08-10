import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const FlyDetailsCard = (props) => {
  return (
    <React.Fragment>
      <Card>
        <Card.Title>Departure Flight</Card.Title>
        <Card.Body>
          <div className="travel-inf">
            <p>
              <span>Mumbai To Goa, 16 Apr</span>
              <span>01hr 30 mins</span>
            </p>
          </div>

          <div className="provider-inf-area">
            <span className="providre-icon"></span>
            <span>Spicejet SG 488 | 737</span>
          </div>
          <Row>
            <Col md={3}>
              <span>11:30</span>
              <span>Fri, 16 Apr 21</span>
              <span>Mumbai, India</span>
            </Col>
            <Col md={3}>
              <span>11:30</span>
            </Col>
            <Col md={3}>
              <span>11:30</span>
              <span>Fri, 16 Apr 21</span>
              <span>Mumbai, India</span>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="table table-striped">
                <p>
                  <span>BAGGAGE :</span>
                  <span>CHECK-IN</span>
                  <span>INCABIN</span>
                </p>

                <p>
                  <span>ADULT</span>
                  <span>15 Kgs</span>
                  <span>7 Kgs</span>
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FlyDetailsCard;
