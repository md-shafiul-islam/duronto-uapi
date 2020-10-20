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
      <Card className="slc-airs">
        <Card.Title>
          <span className="title-icon">Icon</span>
          <span className="travel-dt-inf">{props.fareCalc}</span>
        </Card.Title>
        <Card.Body className="penalty-area">
          <Row className="charge-inf">
            <Col md={6}>
              <span>Passenger</span>
            </Col>
            <Col md={6} className="charge-details">
              <span>
                Time frame & Amount
                <small> (From Scheduled flight departure)</small>
              </span>
            </Col>
          </Row>

          <Row>
            <Col className="passenger-type" md={6}>
              ADULT{" "}
            </Col>
            <Col md={6} className="penalty">
              {props &&
                props.data.ADT &&
                props.data.ADT.map((itemAdt) => {
                  return (
                    <React.Fragment>
                      <Row>
                        <Col md={12}>
                          <span className="cond">{itemAdt.penaltyApplies}</span>
                          <span className="amount">
                            {itemAdt.amount === null ? "0.0" : itemAdt.amount}
                          </span>
                        </Col>
                      </Row>
                    </React.Fragment>
                  );
                })}
            </Col>
          </Row>

          <Row>
            <Col className="passenger-type" md={6}>
              CHILD{" "}
            </Col>
            <Col md={6} className="penalty">
              {props.data.CNN &&
                props.data.CNN.map((itemAdt) => {
                  return (
                    <React.Fragment>
                      <Row>
                        <Col md={12}>
                          <span className="cond">{itemAdt.penaltyApplies}</span>
                          <span className="amount">
                            {itemAdt.amount === null ? "0.0" : itemAdt.amount}
                          </span>
                        </Col>
                      </Row>
                    </React.Fragment>
                  );
                })}
            </Col>
          </Row>

          <Row>
            <Col className="passenger-type" md={6}>
              INFANT{" "}
            </Col>
            <Col md={6} className="penalty">
              {props.data.INF &&
                props.data.INF.map((itemAdt) => {
                  return (
                    <React.Fragment>
                      <Row>
                        <Col md={12}>
                          <span className="cond">{itemAdt.penaltyApplies}</span>
                          <span className="amount">
                            {itemAdt.amount === null ? "0.0" : itemAdt.amount}
                          </span>
                        </Col>
                      </Row>
                    </React.Fragment>
                  );
                })}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ChargeCardDetails;
