import React,{useEffect} from "react";
import { Card, Row, Col } from "react-bootstrap";
import PricingFareTypeCard from "./pricingFareTypeCard";
import PricingFlyDetails from "./pricingFlyDetails";

const PricingFareDetailsInfoCard = (params) => {
  
  console.log("Price Fare Details card: ", params);

  useEffect(() => {
  
    if(params.depAirSegment !== undefined && params.retAirSegment !== undefined){

      let depLenght = params.depAirSegment.length;
      let retLenght = params.retAirSegment.length;

      let detureSegmentsDetails = {airLine:[], flightNo:[], origin:"", destination:"", deptureDate:"", layover:[]};
      let returnSegmentsDetails = {airLine:[], flightNo:[], origin:"", destination:"", deptureDate:"", layover:[]};

      let depAirlines = new Array();
      let depflightNos = new Array();
      let depLayovers = new Array();

      let dLastIdx = 0;

      if( depLenght > 1){
                
        params.depAirSegment.map((depSegItem, dIdx)=>{

          if(dIdx === 0){
            detureSegmentsDetails.origin = depSegItem.origin;
            detureSegmentsDetails.deptureDate = depSegItem.departureTime;
            depAirlines.push(depSegItem.carrier);
            depflightNos.push(depSegItem.flightNumber);
            dLastIdx = dIdx;
            
          }else{

            if(dIdx === (depLenght-1)){
              detureSegmentsDetails.destination = depSegItem.destination;
              depLayovers.push(depSegItem.origin);
                            
              depflightNos.push(depSegItem.flightNumber);

              if(depSegItem.carrier === depAirlines[dLastIdx]){

              }else{
                depAirlines.push(depSegItem.carrier);

              }
            }else{
              depLayovers.push(depSegItem.origin);
            }
          }

        });

        detureSegmentsDetails.flightNo = depflightNos;
        detureSegmentsDetails.airLine = depAirlines;
        detureSegmentsDetails.layover = depLayovers;

      }else{
        
      }

    }
  }, [])

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <PricingFlyDetails />
          </Col>

          {/*** Pricing Details Mapp */}
          <Col md={9} >
            <div className="pricing-items">
              {params.returnOption[0].airPricingSolution &&
                params.returnOption[0].airPricingSolution.map(
                  (retnItem, rtIdx) => {
                    return (
                      <Col md={5} key={`pcgc-${rtIdx}`} className="hrz-item">
                        <PricingFareTypeCard airSolution={retnItem} />
                      </Col>
                    );
                  }
                )}
              </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PricingFareDetailsInfoCard;
