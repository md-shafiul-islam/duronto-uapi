import React from "react";
import { Col, Row } from "react-bootstrap";
import { helperGetFullDateFormatFYear } from "../../../actions/helperAction";
import PricingAirlinceInfo from "./pricingAirlinceInfo";
import { shallowEqual, useSelector } from 'react-redux';


const PricingFlyDetails = (params) => {

  const reduxAirPortList = useSelector((state)=>state.airSearch.airPortsList, shallowEqual);

  console.log("Params: PricingFlyDetails: , ", params);
  
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

    let port = undefined;
    let portName = "";

    if (reduxAirPortList !== undefined && name !== undefined) {
      let slIdx = undefined;
      
      console.log("reduxAirPortList[name], ", reduxAirPortList[name]);
      port = reduxAirPortList[name];

      if(port !== undefined){
        portName = port.name;
      }

    }

    return portName;
  };

  const getFullDateTime = (dateTime)=>{

    if(dateTime !== undefined){
      return helperGetFullDateFormatFYear(dateTime);
    }
   return "";
  }
  console.log("Pricing Fly Details: ", params);
  return (
    <React.Fragment>
      <PricingAirlinceInfo
        airLinces={params.airSegment && params.airSegment.airLine}
        flyNum={params.airSegment && params.airSegment.flightNo}
        
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
          {console.log("Pricing Fly details params.airSegment.deptureDate: ", params.airSegment.deptureDate)}
          {getFullDateTime(params.airSegment.deptureDate)}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PricingFlyDetails;
