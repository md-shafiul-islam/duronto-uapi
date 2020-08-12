import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const ChargeCardDetails = () => {
  return (
    <React.Fragment>
      <Card className="slc-airs">
        <Card.Title>
          <span className="title-icon">Icon</span>
          <span className="travel-dt-inf">BOM-GOI</span>
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
              <Row>
                <Col md={6}>
                  <span>0 hours to 2 hours*</span>
                </Col>
                <Col md={6} className="charge-text">
                  <span>
                    ADULT :<b> Non Refundable</b>
                  </span>
                  <span>
                    CHILD :<b> Non Refundable</b>
                  </span>
                  <span>
                    INFANT :<b> Non Refundable</b>
                  </span>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <span>0 hours to 2 hours*</span>
                </Col>
                <Col md={6} className="charge-text">
                  <span>
                    ADULT :<b> $45 + $5</b>
                  </span>
                  <span>
                    CHILD :<b> $45 + $5</b>
                  </span>
                  <span>
                    INFANT :<b> Non Refundable</b>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ChargeCardDetails;
