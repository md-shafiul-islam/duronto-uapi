import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import OneWayPriceing from "./oneWayPriceing";
import RndTripPriceingDetailsPage from "./RndTripDetailsPage/rndTripPriceingDetailsPage";


class PricingDetailsPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          {false && (
            <Col md={12}>
              <OneWayPriceing />
            </Col>
          )}

          {true && (
            <Col md={12}>
              <RndTripPriceingDetailsPage />
            </Col>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

export default PricingDetailsPage;
