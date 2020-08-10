import React from "react";
import { Card } from "react-bootstrap";

const ChargeCardDetails = () => {
  return (
    <React.Fragment>
      <Card>
        <Card.Title>
          <span>Icon</span>
          <span>BOM-GOI</span>
        </Card.Title>
        <Card.Body>
          <div>
            <p>
              <span>
                Time frame
                <small>(From Scheduled flight departure)</small>
              </span>
              <span>
                Airline Fee + MMT Fee
                <small>(Per passenger)</small>
              </span>
            </p>
            <p>
              <span>0 hours to 2 hours*</span>
              <span>
                <b>ADULT :</b> Non Refundable
                <b>CHILD :</b> Non Refundable
                <b>INFANT :</b>Non Refundable
              </span>
            </p>
            <p>
              <span>0 hours to 2 hours*</span>
              <span>
                <b>ADULT :</b> $50
                <b>CHILD :</b> $50
                <b>INFANT :</b>Non Refundable
              </span>
            </p>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ChargeCardDetails;
