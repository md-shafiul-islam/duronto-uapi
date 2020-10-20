import { set } from "date-fns";
import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import BookingCardRoundTripOptions from "./BookingCardRoundTripOptions";
import StickyCard from "./StickyCard";

const FlyOptionRoundTrip = (params) => {
  const requestPrice = {
    OfferQueryBuildFromProducts: {
      BuildFromProductsRequest: {
        "@type": "BuildFromProductsRequestAir",
        PassengerCriteria: [
          {
            value: "ADT",
            number: 1,
          },
        ],
        ProductCriteriaAir: [
          {
            "@type": "ProductCriteriaAir",
            SpecificFlightCriteria: [
              {
                "@type": "SpecificFlightCriteria",
                carrier: "F9",
                flightNumber: "403",
                departureDate: "2018-09-22",
                departureTime: "10:22:00.000-06:00",
                arrivalDate: "2018-09-22",
                arrivalTime: "11:57:00.000-07:00",
                from: "DEN",
                to: "LAX",
                cabin: "Economy",
                classOfService: "G",
                segmentSequence: "0",
              },
            ],
          },
        ],
      },
    },
  };

  console.log(" FlyOption Ropund Trip: Params: ", params);
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          {params.availAbleFlights &&
            params.availAbleFlights.map((flyItem, fIdx) => {
              if (flyItem.airLeg.group === params.airLegs[0].group) {
                return (
                  <React.Fragment>
                    <BookingCardRoundTripOptions
                      preSelecteItem={params.preSelectFly.deptureFly}
                      flyItem={flyItem}
                      elmId={fIdx}
                      getSelectedItem={(flyOption, opIdx, elmId) => {
                        params.getDepSelectedFly(flyOption, opIdx, elmId);
                      }}
                    />
                  </React.Fragment>
                );
              }
            })}
        </Col>
        <Col md={6}>
          {params.availAbleFlights &&
            params.availAbleFlights.map((flyItem, fIdx) => {
              if (flyItem.airLeg.group === params.airLegs[1].group) {
                return (
                  <React.Fragment>
                    <BookingCardRoundTripOptions
                      preSelecteItem={params.preSelectFly.returnFly}
                      flyItem={flyItem}
                      elmId={fIdx}
                      getSelectedItem={(flyOption, opIdx, elmId) => {
                        params.getRetSelectedFly(flyOption, opIdx, elmId);
                      }}
                    />
                  </React.Fragment>
                );
              }
            })}
        </Col>
        <Col md={12}>
          <StickyCard flyOption={params.selectedOption} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FlyOptionRoundTrip;
