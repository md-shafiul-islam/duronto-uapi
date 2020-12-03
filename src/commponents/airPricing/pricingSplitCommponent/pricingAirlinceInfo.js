import React from "react";
import { Col, Row } from "react-bootstrap";

const PricingAirlinceInfo = (params) => {
  console.log("PricingAirlinceInfo params, ", params);
  
  const getAirLineName = (cCode)=>{
    let rCode = "";

    if(params.airLineList !== undefined && cCode !== undefined){

      let sIdx = undefined;

      params.airLineList.filter((airLine, aIdx)=>{

        if(cCode === airLine.code){
          sIdx = aIdx;

          rCode = airLine.name;
          return true;
        }
      });

      if(rCode === "" && sIdx !== undefined){
        rCode = params.airLineList[sIdx].name;
      }
      
      return rCode;
    }
    
    return rCode;
  }

  const getAirNameAndNo = (flyNums) => {
    if (flyNums !== undefined) {
      return (
        <React.Fragment>
          {flyNums.map((fItem, idx) => {
            return idx > 0 ? (
              <span>{`, ${getAirLineName(fItem.name)} | ${fItem.name}-${fItem.num}`}</span>
            ) : (
              <span>{`${getAirLineName(fItem.name)} | ${fItem.name}-${fItem.num}`}</span>
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
