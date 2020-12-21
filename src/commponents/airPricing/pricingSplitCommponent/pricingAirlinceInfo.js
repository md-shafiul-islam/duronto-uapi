import React from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from 'react-redux';
import IconView from "../../airSearch/iconView";

const PricingAirlinceInfo = (params) => {
  
  console.log("Pricing Fly Details: -> Pricing Airlince Info ", params);

  const reduxAirLinceList = useSelector((state)=>state.airSearch.airLinesList, shallowEqual);

  console.log("Pricing Fly Details: -> Pricing Airlince Info reduxAirLinceList: ", reduxAirLinceList);


  const getAirLineName = (cCode) => {
    let rCode = "";
    let airLinse = undefined;

    if (reduxAirLinceList !== undefined && cCode !== undefined) {
      let sIdx = undefined;

      airLinse = reduxAirLinceList[cCode];

      if (airLinse !== undefined) {
        rCode = airLinse.name;
      }

      return rCode;
    }

    return rCode;
  };

  const getAirNameAndNo = (flyNums) => {
    if (flyNums !== undefined) {
      return (
        <React.Fragment>
          {flyNums.map((fItem, idx) => {
            return idx > 0 ? (
              <span>{`, ${getAirLineName(fItem.name)} | ${fItem.name}-${
                fItem.num
              }`}</span>
            ) : (
              <span>{`${getAirLineName(fItem.name)} | ${fItem.name}-${
                fItem.num
              }`}</span>
            );
          })}
        </React.Fragment>
      );
    }
  };
  return (
    <Row>
      <Col md={3} className="pricing-icon">
        <IconView
          airlinseList={reduxAirLinceList}
          selectedAirs={params.airLinces}
          iconSizeClass="icon-view-area-medium"
        />
      </Col>
      <Col md={9} className="pricing-air-inf">
        {getAirNameAndNo(params.flyNum)}
      </Col>
    </Row>
  );
};

export default PricingAirlinceInfo;
