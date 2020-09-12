import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import FlyDetailsCard from "./FlightCards/FlyDetailsCard";
import ChargeCardDetails from "./FlightCards/ChargeCardDetails";
import FareSummaryCard from "./FlightCards/FareSummaryCard";
import SelectedAirDetails from "./SelectedAirDetails";

const SelectedTab = (props) => {
  const [key, setKey] = useState("flightDetails");

  const selectedBookingOptionAction = (ids, item) => {
    props.getSelectedOption(item, ids);
  };

  return (
    <Tabs id="selected-air" activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab
        eventKey="flightDetails"
        title="Flight Details"
        className="airtab-container"
      >
        <FlyDetailsCard
          availavleFlight={props.availavleFlight}
          brands={props.brands}
          elementKey={props.elmKey}
          getSelectedFly={(ids, bookingInf) => {
            selectedBookingOptionAction(ids, bookingInf);
          }}
          preSelectOption={props.preSetOption}
          removeFlyAction={props.removeFlyOptionAction}
        />
      </Tab>
      <Tab
        eventKey="fareSummary"
        title="Fare Summary"
        className="airtab-container"
      >
        <FareSummaryCard
          airPriceInf={
            props.availavleFlight !== undefined
              ? props.availavleFlight.airPricingInfo
              : null
          }
        />
      </Tab>
      <Tab
        eventKey="cancellation"
        title="Cancellation"
        className="airtab-container"
      >
        {/*Cancel Charge*/}

        <ChargeCardDetails
          charges={
            props.availavleFlight !== undefined
              ? props.availavleFlight.cancel
              : null
          }
          fareCalc={
            props.availavleFlight !== undefined
              ? props.availavleFlight.airPricingInfo !== undefined
                ? props.availavleFlight.airPricingInfo.fareCalc
                : null
              : null
          }
        />
      </Tab>
      <Tab
        eventKey="dateChange"
        title="Date Change"
        className="airtab-container"
      >
        <ChargeCardDetails
          charges={
            props.availavleFlight !== undefined
              ? props.availavleFlight.change
              : null
          }
          fareCalc={
            props.availavleFlight !== undefined
              ? props.availavleFlight.airPricingInfo !== undefined
                ? props.availavleFlight.airPricingInfo.fareCalc
                : null
              : null
          }
        />
      </Tab>
    </Tabs>
  );
};

export default SelectedTab;
