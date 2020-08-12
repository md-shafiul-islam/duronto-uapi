import React from "react";
import { Card } from "react-bootstrap";

const FareSummaryCard = (props) => {
  return (
    <React.Fragment>
      <Card className="slc-airs">
        <Card.Title>FARE SUMMARY</Card.Title>
        <Card.Body>
          <div className="fare-summary">
            <h6>Fare brackup</h6>
            <p className="total">
              <span>TOTAL</span>
              <span>$1500</span>
            </p>
            <p>
              <span>Base Fare</span>
              <span>$1400</span>
            </p>
            <p>
              <span>Surcharges</span>
              <span>$100</span>
            </p>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FareSummaryCard;
