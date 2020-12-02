import React from "react";
import { Col, Row } from "react-bootstrap";
import PricingAirlinceInfo from "./pricingAirlinceInfo";

const PricingFlyDetails = (params) => {
  return (
    <React.Fragment>
      <PricingAirlinceInfo />

      <Row>
        <Col md={12} className="pricing-locs">Bombay To Goa</Col>
      </Row>
      <Row>
        <Col md={12} className="pricing-layover">1 stop via Deli</Col>
      </Row>
      <Row>
        <Col md={12} className="pricing-timefrem">Onward Departure | Tue, 08 Dec</Col>
      </Row>
    </React.Fragment>
  );
};

export default PricingFlyDetails;
