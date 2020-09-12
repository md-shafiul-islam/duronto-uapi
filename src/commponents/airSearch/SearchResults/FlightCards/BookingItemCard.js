import React from "react";
import { Row, Col } from "react-bootstrap";

const BookingItemCard = (params) => {
  console.log("BIC ", params);
  return (
    <React.Fragment>
      <div className={`fly-item`}>
        <Row>
          <Col md={6}>
            <div className="provider-inf-area">
              <span className="providre-icon"></span>
              <span className="providre-text">
                {"carrier"} | {"fareBasis"}
              </span>
            </div>
          </Col>
          <Col md={6}>
            <div className="book-inf">
              Booking Code:{" "}
              <span className="label label-important label-inf arrowed-right">
                {" "}
                {"bookingCode"}
              </span>
            </div>
            <div className="book-inf">
              <span className="label label-important arrowed-in">
                {"cabinClass"}
              </span>
            </div>
          </Col>
        </Row>
        <Row className="fly-details">
          <Col md={9}>
            <Row>
              <Col md={3} className="fly-dep-ret">
                <span className="fly-time">{`${"05"}:${495}`}</span>
                <span className="fly-date">{`${494}/${49849}/${484845}`}</span>
                <span className="fly-location">{` ${origin}`}</span>
              </Col>
              <Col md={3} className="in-air">
                <span>{84984}</span>
              </Col>
              <Col md={3} className="fly-dep-ret">
                <span className="fly-time">{`${"01"}:${40}`}</span>
                <span className="fly-date">{`${"05"}/${"06"}/${2021}`}</span>
                <span className="fly-location">{` ${498498}`}</span>
              </Col>

              <Col md={3} className="fly-price-text">
                <span className="currency-type">{`${"BDT: "}`}</span>
                <span className="amount">{`${86489}`}</span>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="mp-0">
            <Row className="pas-details">
              <Col md={12} className="p-title">
                <p>
                  <span>BAGGAGE :</span>

                  <span>&nbsp;</span>
                </p>

                <p>
                  <span>Max Weight :{" 25"}</span>

                  <span>{" KG"}</span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default BookingItemCard;
