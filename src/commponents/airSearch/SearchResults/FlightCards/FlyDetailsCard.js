import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const FlyDetailsCard = (props) => {
  return (
    <React.Fragment>
      <Card className="slc-airs">
        <Card.Title>Departure Flight</Card.Title>
        <Card.Body>
          <div className="travel-inf">
            <span className="dep-inf">Mumbai To Goa, 16 Apr</span>
            <span className="fly-time">01hr 30 mins</span>
          </div>

          <div className="provider-inf-area">
            <span className="providre-icon"></span>
            <span className="providre-text">Spicejet SG 488 | 737</span>
          </div>
          <Row className="fly-details">
            <Col md={4} className="fly-dep-ret">
              <span className="fly-time">11:30</span>
              <span className="fly-date">Fri, 16 Apr 21</span>
              <span className="fly-location">Mumbai, India</span>
            </Col>
            <Col md={4} className="in-air">
              <span>01hr 30 mins</span>
            </Col>
            <Col md={4} className="fly-dep-ret">
              <span className="fly-time">01:00</span>
              <span className="fly-date">Fri, 16 Apr 21</span>
              <span className="fly-location">Goa, India</span>
            </Col>
          </Row>
          <Row className="pas-details">
            <Col md={12} className="p-title">
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
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FlyDetailsCard;
