import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PricingFareDetailsInfoCard from "../airPricing/pricingSplitCommponent/pricingFareDetailsInfoCard";

const RoundTripPriceOptionModal = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.display);
  }, [props.display]);

  return (
    <React.Fragment>
      
      <Modal
        className="selected-air-price-model"
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="price-dialog"
        aria-labelledby="arial-label"
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="selected-air-price-title">
            Selected Flight Price Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <PricingFareDetailsInfoCard />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RoundTripPriceOptionModal;
