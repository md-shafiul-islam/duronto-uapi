import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const FareSummaryCard = (props) => {
  const getPriceFormat = (price) => {
    if (price === undefined || price === null) {
      return "Availabe Price Details After Price request";
    } else {
      let cType,
        amount = "";

      cType = price.substring(0, 3);
      amount = price.substring(3);

      return `${cType}: ${amount}`;
    }
  };
  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="fare-summary-title">
          Fare breakup
        </Col>
        <Col md={7} className="fare-summary">
          <Row className="air-total-price">
            <Col md={6}>Total</Col>
            <Col md={6} className="fare-amount">
              {getPriceFormat(props.fareSummary.airTotalPrice)}
            </Col>
          </Row>

          <Row className="air-base-price">
            <Col md={6}>Base Fare</Col>
            <Col md={6} className="fare-amount">
              {getPriceFormat(props.fareSummary.airBasePrice)}
            </Col>
          </Row>

          <Row className="air-tax">
            <Col md={6}>Tax</Col>
            <Col md={6} className="fare-amount">
              {getPriceFormat(props.fareSummary.airTax)}
            </Col>
          </Row>
        </Col>
        <Col md={5}></Col>
      </Row>
    </React.Fragment>
  );
};

export default FareSummaryCard;
