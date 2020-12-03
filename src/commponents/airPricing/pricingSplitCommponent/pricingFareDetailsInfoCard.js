import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import PricingFareTypeCard from "./pricingFareTypeCard";
import PricingFlyDetails from "./pricingFlyDetails";

const PricingFareDetailsInfoCard = (params) => {
  console.log("Price Fare Details card: ", params);

  const [retAirSegmentDe, setRetAirSegmentDe] = useState({});
  const [depAirSegmentDe, setDepAirSegmentDe] = useState({});

  useEffect(() => {
    if (
      params.depAirSegment !== undefined &&
      params.retAirSegment !== undefined
    ) {
      let depLenght = params.depAirSegment.length;
      let retLenght = params.retAirSegment.length;

      let detureSegmentsDetails = {
        airLine: [],
        flightNo: [],
        origin: "",
        destination: "",
        deptureDate: "",
        layover: [],
      };
      let returnSegmentsDetails = {
        airLine: [],
        flightNo: [],
        origin: "",
        destination: "",
        deptureDate: "",
        layover: [],
      };

      let depAirlines = new Array();
      let depflightNos = new Array();
      let depLayovers = new Array();

      let retAirlines = new Array();
      let retflightNos = new Array();
      let retLayovers = new Array();

      let dLastIdx = 0;
      let rLastIdx = 0;

      if (depLenght > 1) {
        params.depAirSegment.map((depSegItem, dIdx) => {
          if (dIdx === 0) {
            detureSegmentsDetails.origin = depSegItem.origin;
            detureSegmentsDetails.deptureDate = depSegItem.departureTime;
            depAirlines.push(depSegItem.carrier);
            depflightNos.push({name: depSegItem.carrier, num:depSegItem.flightNumber});
            dLastIdx = dIdx;
          } else {
            if (dIdx === depLenght - 1) {
              detureSegmentsDetails.destination = depSegItem.destination;
              depLayovers.push(depSegItem.origin);

              depflightNos.push({name: depSegItem.carrier, num:depSegItem.flightNumber});

              if (depSegItem.carrier === depAirlines[dLastIdx]) {
              } else {
                depAirlines.push(depSegItem.carrier);
              }
            } else {
              depLayovers.push(depSegItem.origin);
            }
          }
        });

        detureSegmentsDetails.flightNo = depflightNos;
        detureSegmentsDetails.airLine = depAirlines;
        detureSegmentsDetails.layover = depLayovers;
      } else {
        params.depAirSegment.map((depSegItem, dIdx) => {
          if (depLenght === dIdx) {
            detureSegmentsDetails.deptureDate = depSegItem.departureTime;

            detureSegmentsDetails.origin = depSegItem.origin;
            detureSegmentsDetails.destination = depSegItem.destination;
            detureSegmentsDetails.flightNo = new Array({name: depSegItem.carrier, num:depSegItem.flightNumber});
            detureSegmentsDetails.airLine = new Array(depSegItem.carrier);
            detureSegmentsDetails.layover = new Array();
          }
        });
      }

      setDepAirSegmentDe(detureSegmentsDetails);

      if (retLenght > 1) {
        params.retAirSegment.map((retSegItem, rIdx) => {
          if (rIdx === 0) {
            returnSegmentsDetails.origin = retSegItem.origin;
            returnSegmentsDetails.deptureDate = retSegItem.departureTime;
            retAirlines.push(retSegItem.carrier);
            retflightNos.push({name: retSegItem.carrier, num:retSegItem.flightNumber});
            rLastIdx = rIdx;
          } else {
            if (rIdx === retLenght - 1) {
              returnSegmentsDetails.destination = retSegItem.destination;
              retLayovers.push(retSegItem.origin);

              retflightNos.push({name: retSegItem.carrier, num:retSegItem.flightNumber});

              if (retSegItem.carrier === retAirlines[rLastIdx]) {
              } else {
                retAirlines.push(retSegItem.carrier);
              }
            } else {
              retLayovers.push(retSegItem.origin);
            }
          }
        });

        returnSegmentsDetails.flightNo = retflightNos;
        returnSegmentsDetails.airLine = retAirlines;
        returnSegmentsDetails.layover = retLayovers;
      } else {
        params.retAirSegment.map((retSegItem, rIdx) => {
          if (retLenght === rIdx) {
            returnSegmentsDetails.deptureDate = retSegItem.departureTime;

            returnSegmentsDetails.origin = retSegItem.origin;
            returnSegmentsDetails.destination = retSegItem.destination;
            returnSegmentsDetails.flightNo = new Array({name: retSegItem.carrier, num:retSegItem.flightNumber});
            returnSegmentsDetails.airLine = new Array(retSegItem.carrier);
            returnSegmentsDetails.layover = new Array();
          }
        });
      }

      setRetAirSegmentDe(returnSegmentsDetails);
    }
  }, []);

  return (
    <React.Fragment>
      <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <PricingFlyDetails airSegment={depAirSegmentDe} />
          </Col>

          {/*** Pricing Details Mapp */}
          <Col md={9}>
            <div className="pricing-items">
              {params.deptureOption[0].airPricingSolution &&
                params.deptureOption[0].airPricingSolution.map(
                  (depItem, dIdx) => {
                    return (
                      <Col md={5} key={`pcgc-dep-${dIdx}`} className="hrz-item">
                        <PricingFareTypeCard airSolution={depItem}  />
                      </Col>
                    );
                  }
                )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>

      <Card>
        <Card.Body>
          <Row>
            <Col md={3}>
              <PricingFlyDetails airSegment={retAirSegmentDe} />
            </Col>

            {/*** Pricing Details Mapp */}
            <Col md={9}>
              <div className="pricing-items">
                {params.returnOption[0].airPricingSolution &&
                  params.returnOption[0].airPricingSolution.map(
                    (retnItem, rtIdx) => {
                      return (
                        <Col md={5} key={`pcgc-ret-${rtIdx}`} className="hrz-item">
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
    
    </React.Fragment>
  );
};

export default PricingFareDetailsInfoCard;
