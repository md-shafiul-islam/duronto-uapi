import React from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import PricingFareDetailsInfoCard from "../airPricing/pricingSplitCommponent/pricingFareDetailsInfoCard";
import PricingModalDetailsCard from "../airPricing/pricingSplitCommponent/pricingModalDetailsCard";

const RoundTripPriceOptionModal = (props) => {
  const continueAirPricingAction = (selectedOption) => {
    props.setRndTripOptionsDetails(selectedOption);
  };

  // const rndRetPrice = useSelector(
  //   (state) => state.airPrice.rndModalRetPrices
  // );
  // const rndDepPrice = useSelector(
  //   (state) => state.airPrice.rndModalDepPrices
  // );

  // console.log("RoundTripPriceOptionModal props, ", props);

  // console.log("RoundTripPriceOptionModal rndRetPrice, ", rndRetPrice);
  // console.log("RoundTripPriceOptionModal rndDepPrice, ", rndDepPrice);
  
  
  return (
    <React.Fragment>
      <Modal
        className="selected-air-price-model"
        show={props.display}
        onHide={() => props.modalAction(false)}
        dialogClassName="price-dialog"
        aria-labelledby="arial-label"
      >
        <Modal.Header closeButton>
          <Modal.Title id="selected-air-price-title">
            Selected Flight Price Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {rndRetPrice.status && rndDepPrice.status ? (
            <PricingFareDetailsInfoCard
              run="Run via Modal !!!"
              returnOption={
                rndRetPrice.orgResponse&&rndRetPrice.orgResponse.airPriceResult
              }
              depAirSegment={
                rndDepPrice.orgResponse&&rndDepPrice.orgResponse.airItinerary&&
                rndDepPrice.orgResponse.airItinerary.airSegment
              }
              retAirSegment={
                rndRetPrice.orgResponse&&rndRetPrice.orgResponse.airItinerary&&
                rndRetPrice.orgResponse.airItinerary.airSegment
              }
              deptureOption={
                rndDepPrice.orgResponse&&rndDepPrice.orgResponse.airPriceResult
              }
              selectedPriceAction={(sltPriceOption) => {
                continueAirPricingAction(sltPriceOption);
              }}
            />
          ) : (
            ""
          )} */}

          <PricingModalDetailsCard />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RoundTripPriceOptionModal;
