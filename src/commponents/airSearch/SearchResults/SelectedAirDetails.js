import React from "react";
import FlyDetailsCard from "./FlightCards/FlyDetailsCard";
import FareSummaryCard from "./FlightCards/FareSummaryCard";
import ChargeCardDetails from "./FlightCards/ChargeCardDetails";

const SelectedAirDetails = (props) => {
  return (
    <React.Fragment>
      <FlyDetailsCard />
      <FareSummaryCard />
      <ChargeCardDetails />
    </React.Fragment>
  );
};

export default SelectedAirDetails;
