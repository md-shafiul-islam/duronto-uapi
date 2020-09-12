import React from "react";
import { Card } from "react-bootstrap";

const FareSummaryCard = (props) => {
  const getPriceFormat = (price) => {
    if (price === undefined || price === null) {
      return "Availabe Price Details After Price request";
    } else {
      let cType,
        amount = "";

      cType = price.substring(0, 3);
      amount = price.substring(3);

      return `${cType}: ${amount}`;
    }
  };
  return (
    <React.Fragment>
      <Card className="slc-airs">
        <Card.Title>FARE SUMMARY</Card.Title>
        <Card.Body>
          <div className="fare-summary">
            <h6>Fare brackup</h6>
            <p className="total">
              <span>TOTAL</span>
              <span>
                {props.airPriceInf &&
                  getPriceFormat(props.airPriceInf.totalPrice)}
              </span>
            </p>
            <p>
              <span>Base Fare</span>
              <span>
                {props.airPriceInf &&
                  getPriceFormat(props.airPriceInf.equivalentBasePrice)}
              </span>
            </p>
            <p>
              <span>Tax</span>
              <span>
                {props.airPriceInf && getPriceFormat(props.airPriceInf.taxes)}
              </span>
            </p>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FareSummaryCard;
