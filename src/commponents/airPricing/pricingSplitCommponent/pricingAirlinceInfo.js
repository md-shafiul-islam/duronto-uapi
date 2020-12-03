import React from "react";
import { Col, Row } from "react-bootstrap";

const PricingAirlinceInfo = (params) => {
    console.log("PricingAirlinceInfo params, ", params);
  const getAirNameAndNo = (flyNums) => {
    if (flyNums !== undefined) {
      return (
        <React.Fragment>
          {flyNums.map((fItem, idx) => {
            return idx > 0 ? (
              <span>{`, ${fItem.name} | ${fItem.name}-${fItem.num}`}</span>
            ) : (
              <span>{`${fItem.name} | ${fItem.name}-${fItem.num}`}</span>
            );
          })}
        </React.Fragment>
      );
    }
  };
  return (
    <Row>
      <Col md={3} className="pricing-icon">
        Icon
      </Col>
      <Col md={9} className="pricing-air-inf">
        {getAirNameAndNo(params.flyNum)}
      </Col>
    </Row>
  );
};

export default PricingAirlinceInfo;
