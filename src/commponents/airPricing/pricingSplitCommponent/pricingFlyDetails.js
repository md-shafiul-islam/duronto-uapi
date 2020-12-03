import React from "react";
import { Col, Row } from "react-bootstrap";
import { helperGetFullDateFormatFYear } from "../../../actions/helperAction";
import PricingAirlinceInfo from "./pricingAirlinceInfo";

const PricingFlyDetails = (params) => {
  console.log("Pricing Fly Details: ", params);

  const getAirportByIndex = (name)=>{
    //console.log("By Index Of: ", params.airPorts.find);
  }

  const getLayOver = (layovers) => {
    if (layovers !== undefined) {
      return (
        <React.Fragment>
          <span>
            {layovers.length > 0
              ? `${layovers.length} Stop via ${layovers.map((layItem, lIdx) => {
                  return lIdx > 0 ? ", " + getAirportName(layItem) : getAirportName(layItem);
                })}`
              : "Non Stop "}{" "}
          </span>
        </React.Fragment>
      );
    }
  };

  const getAirportName = (name) => {

    let portName = "";

    if (params.airPorts !== undefined && name !== undefined) {
      let slIdx = undefined;
    
      params.airPorts.filter((port, pidx) => {
        
        console.log("Air Port : ", port);
        console.log("Airport Name: ", port.iataCode, " Params: ", name);
        if (name === port.iataCode) {

          console.log("Match Airport Name: ", port.location);

          portName = port.location;
          slIdx = pidx;
          
          return true;
        }
      });

      if (portName === "" && slIdx !== undefined) {
        portName = params.airLinces[slIdx].location;
      }
    }

    console.log(" Name: ", portName);

    return portName;
  };

  return (
    <React.Fragment>
      <PricingAirlinceInfo
        airLinces={params.airSegment && params.airSegment.airLine}
        flyNum={params.airSegment && params.airSegment.flightNo}
        airLineList = {params.airLines}
      />

      <Row>
        <Col md={12} className="pricing-locs">
          {params.airSegment && getAirportName(params.airSegment.origin)} To{" "}
          {params.airSegment && getAirportName(params.airSegment.destination)}
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
