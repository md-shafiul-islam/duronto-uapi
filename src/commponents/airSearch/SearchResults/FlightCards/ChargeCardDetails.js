import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const ChargeCardDetails = (props) => {
  const getPriceFormat = (price) => {
    if (price === undefined) {
      return " 0.0";
    } else {
      if (price !== null) {
        let stPrice = price.substring(3);
        let type = price.substring(0, 3);

        return ` ${type}. ${stPrice}`;
      }
    }
  };

  return (
    <React.Fragment>
      {console.log("Charge : ", props)}
      <Card className="slc-airs">
        <Card.Title>
          <span className="title-icon">Icon</span>
          <span className="travel-dt-inf">{props.fareCalc}</span>
        </Card.Title>
        <Card.Body>
          <Row>
            <Col md={12}>
              <div className="charge-inf">
                <p>
                  <span>
                    Time frame &nbsp;
                    <small>(From Scheduled flight departure)</small>
                  </span>
                  <span>
                    Airline Fee + MMT Fee &nbsp;
                    <small>(Per passenger)</small>
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="charge-details">
              {props.charges.ADT.length > 0 ||
              props.charges.CNN.length ||
              props.charges.INF.length ? (
                <Row>
                  <Col md={6}>
                    <span>{props.charges.ADT[0].penaltyApplies}</span>
                  </Col>
                  <Col md={6} className="charge-text">
                    <span>
                      ADULT:
                      <b> {getPriceFormat(props.charges.ADT[0].amount)}</b>
                    </span>
                    <span>
                      CHILD:
                      <b>{getPriceFormat(props.charges.CNN[0].amount)}</b>
                    </span>
                    <span>
                      INFANT:
                      <b>{getPriceFormat(props.charges.INF[0].amount)} </b>
                    </span>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {props.charges.ADT.length === 2 ||
              props.charges.CNN.length === 2 ||
              props.charges.INF.length === 2 ? (
                <Row>
                  <Col md={6}>
                    <span>
                      {props.charges.ADT[1] !== undefined
                        ? props.charges.ADT[1].penaltyApplies
                        : ""}{" "}
                      *
                    </span>
                  </Col>
                  <Col md={6} className="charge-text">
                    <span>
                      ADULT:
                      <b>
                        {" "}
                        {props.charges.ADT[1] === undefined
                          ? "0.0"
                          : props.charges.ADT[1].amount !== null
                          ? getPriceFormat(props.charges.ADT[1].amount)
                          : "0.0"}
                      </b>
                    </span>
                    <span>
                      CHILD:
                      <b>
                        {" "}
                        {props.charges.CNN[1] === undefined
                          ? "0.0"
                          : props.charges.CNN[1].amount !== null
                          ? getPriceFormat(props.charges.CNN[1].amount)
                          : "0.0"}
                      </b>
                    </span>
                    <span>
                      INFANT:
                      <b>
                        {" "}
                        {props.charges.INF[1] === undefined
                          ? "0.0"
                          : props.charges.INF[1].amount !== null
                          ? getPriceFormat(props.charges.INF[1].amount)
                          : "0.0"}
                      </b>
                    </span>
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ChargeCardDetails;
