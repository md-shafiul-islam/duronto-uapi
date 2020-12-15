import React from "react";
import { Col, Row } from "react-bootstrap";
import IconView from "../../airSearch/iconView";

const PricingAirlinceInfo = (params) => {
  const getAirLineName = (cCode) => {
    let rCode = "";
    let airLinse = undefined;

    if (params.airLineList !== undefined && cCode !== undefined) {
      let sIdx = undefined;

      airLinse = params.airLineList[cCode];

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
          airlinseList={params.airLineList}
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
