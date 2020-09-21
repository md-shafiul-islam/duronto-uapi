import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import SelectedTab from "../SelectedTab";
import DetailBookingCard from "./DetailBookingCard";

const BookingItemCard = (params) => {
  const [display, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  const getTimeFormatHr = (timeValue) => {
    if (timeValue != undefined) {
      let dateTime = new Date(timeValue);
      let hr = null;

      if (dateTime) {
        hr =
          dateTime.getHours() < 9
            ? `0${dateTime.getHours() + 1}`
            : `${dateTime.getHours() + 1}`;

        if (!isNaN(hr)) {
          return hr;
        }
      }
    }
    return "00";
  };

  const getTimeFormatMin = (timeValue) => {
    if (timeValue != undefined) {
      let dateTime = new Date(timeValue);
      let min = null;

      if (dateTime) {
        min =
          9 >= dateTime.getMinutes()
            ? `0${dateTime.getMinutes()}`
            : `${dateTime.getMinutes()}`;

        if (!isNaN(min)) {
          return min;
        }
      }

      return "00";
    }
  };

  const getPrice = (amount) => {
    let price = "";

    if (amount === undefined) {
      return "";
    } else {
      price = `${amount.substring(0, 3)}: ${amount.substring(3)}`;
    }

    return price;
  };

  const getFlyOptionAndTime = (timeValue) => {
    let airStop = "";

    airStop = params.flyOption.airStops.length;

    return (
      <React.Fragment>
        <div>
          <span>{timeValue}</span>
        </div>
        <div>
          <span>{airStop}</span>
          {params.flyOption.airStops &&
            params.flyOption.airStops.map((stop, i) => {
              return <span>{stop}</span>;
            })}
        </div>
      </React.Fragment>
    );
  };
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Card className="booking-card">
        <Card.Body>
          <Row className="fly-inf-area">
            <Col md={3}>
              <div>
                {params.flyOption &&
                  params.flyOption.carriers.map((cCode, idx) => {
                    return <span className="air-icon">{cCode}</span>;
                  })}
              </div>

              <div>
                {params.flyOption &&
                  params.flyOption.flightNumbers.map((fNum, fidx) => {
                    return (
                      <React.Fragment>
                        <span className="air-number">
                          {fidx > 0 ? " | " : " "} {fNum}
                        </span>
                      </React.Fragment>
                    );
                  })}
              </div>
            </Col>

            <Col md={5}>
              <Row>
                <Col md={4}>
                  <div className="fly-time-inf">
                    <span className="fly-hour">
                      {getTimeFormatHr(params.flyOption.flyDepartureTime)}
                      {":"}
                    </span>
                    <span className="fly-min">
                      {getTimeFormatMin(params.flyOption.flyDepartureTime)}
                    </span>
                  </div>
                  <div className="fly-loc-inf">
                    <span>
                      {params.flyOption && params.flyOption.firstOrigin}
                    </span>
                  </div>
                </Col>

                <Col md={4}>
                  <span className="travel-time">
                    {getFlyOptionAndTime(params.flyOption.flyDuration)}
                  </span>
                </Col>

                <Col md={4}>
                  <div className="fly-time-inf">
                    <span className="fly-hour">
                      {getTimeFormatHr(params.flyOption.flyArrivalTime)}
                      {":"}
                    </span>
                    <span className="fly-min">
                      {getTimeFormatMin(params.flyOption.flyArrivalTime)}
                    </span>
                  </div>
                  <span className="fly-loc-inf">
                    {params.flyOption && params.flyOption.lastDestination}
                  </span>
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <Row>
                <Col md={7}>
                  <span className="price">
                    {getPrice(params.flyOption.totalPrice)}
                  </span>
                </Col>

                <Col md={5}>
                  <Button>View Price</Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="fly-details-area">
            <Col md={12} className="lfp-0 ">
              <ul
                className={`fly-title`}
                onClick={() => {
                  toggleDisplay();
                }}
              >
                <li
                  className={`fly-details-btn ${
                    display === true ? "expand" : ""
                  }`}
                >
                  Flight Details
                </li>
              </ul>
              <div
                className={`fly-accrodian ${
                  display === true ? "active" : "inactive"
                }`}
              >
                <SelectedTab
                  bookInfos={params.flyOption.bookInfos}
                  getTimeFormatHr={getTimeFormatHr}
                  getTimeFormatMin={getTimeFormatMin}
                  carriers={params.flyOption.carriers}
                  flightNumbers={params.flyOption.flightNumbers}
                />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default BookingItemCard;
