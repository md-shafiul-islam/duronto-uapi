import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PricingFareDetailsInfoCard from "../airPricing/pricingSplitCommponent/pricingFareDetailsInfoCard";

const RoundTripPriceOptionModal = (props) => {
  const [show, setShow] = useState(false);

  
  const continueAirPricingAction = (selectedOption)=>{
    props.setRndTripOptionsDetails(selectedOption)
  }
  
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
          <PricingFareDetailsInfoCard
            run="Run via Modal !!!"
            returnOption={
              props.selectedPricingOptions.retResp&&props.selectedPricingOptions.retResp.orgResponse.airPriceResult
            }
            depAirSegment={
              props.selectedPricingOptions.depResp&&props.selectedPricingOptions.depResp.orgResponse.airItinerary.airSegment
            }
            retAirSegment={
              props.selectedPricingOptions.retResp&&props.selectedPricingOptions.retResp.orgResponse.airItinerary.airSegment
            }
            deptureOption={
              props.selectedPricingOptions.depResp&&props.selectedPricingOptions.depResp.orgResponse.airPriceResult
            }

            selectedPriceAction={(sltPriceOption) => {
              continueAirPricingAction(sltPriceOption);
            }}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RoundTripPriceOptionModal;
