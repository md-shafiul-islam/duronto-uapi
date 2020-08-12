import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import FlyDetailsCard from "./FlightCards/FlyDetailsCard";
import ChargeCardDetails from "./FlightCards/ChargeCardDetails";
import FareSummaryCard from "./FlightCards/FareSummaryCard";

const SelectedTab = (props) => {
  const [key, setKey] = useState("flightDetails");
  return (
    <Tabs id="selected-air" activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab
        eventKey="flightDetails"
        title="Flight Details"
        className="airtab-container"
      >
        <FlyDetailsCard />
      </Tab>
      <Tab
        eventKey="fareSummary"
        title="Fare Summary"
        className="airtab-container"
      >
        <FareSummaryCard />
      </Tab>
      <Tab
        eventKey="cancellation"
        title="Cancellation"
        className="airtab-container"
      >
        <ChargeCardDetails />
      </Tab>
      <Tab
        eventKey="dateChange"
        title="Date Change"
        className="airtab-container"
      >
        <ChargeCardDetails />
      </Tab>
    </Tabs>
  );
};

export default SelectedTab;
