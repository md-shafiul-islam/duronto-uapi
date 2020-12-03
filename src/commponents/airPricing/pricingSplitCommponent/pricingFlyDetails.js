import React from "react";
import { Col, Row } from "react-bootstrap";
import { helperGetFullDateFormatFYear } from "../../../actions/helperAction";
import PricingAirlinceInfo from "./pricingAirlinceInfo";

const PricingFlyDetails = (params) => {
  console.log("Pricing Fly Details: ", params);

  const getLayOver = (layovers) => {
    if (layovers !== undefined) {
      return (
        <React.Fragment>
          <span>
            {layovers.length > 0
              ? `${layovers.length} Stop via ${layovers.map((layItem, lIdx) => {
                  return lIdx > 0 ? ", " + layItem : layItem;
                })}`
              : "Non Stop "}{" "}
          </span>
        </React.Fragment>
      );
    }
  };
  return (
    <React.Fragment>
      <PricingAirlinceInfo
        airLinces={params.airSegment && params.airSegment.airLine}
        flyNum={params.airSegment && params.airSegment.flightNo}
      />

      <Row>
        <Col md={12} className="pricing-locs">
          {params.airSegment && params.airSegment.origin} To{" "}
          {params.airSegment && params.airSegment.destination}
        </Col>
      </Row>
      <Row>
        <Col md={12} className="pricing-layover">
          {getLayOver(params.airSegment && params.airSegment.layover)}
        </Col>
      </Row>
      <Row>
        <Col md={12} className="pricing-timefrem">
          Onward Departure |{" "}
          {helperGetFullDateFormatFYear(params.airSegment.deptureDate)}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PricingFlyDetails;
