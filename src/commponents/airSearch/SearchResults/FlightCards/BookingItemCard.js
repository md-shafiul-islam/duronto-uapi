import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import SelectedTab from "../SelectedTab";
import DetailBookingCard from "./DetailBookingCard";

const BookingItemCard = (params) => {
  const [display, setDisplay] = useState(false);
  const [totalTravelTime, setTotalTravelTime] = useState("");

  useEffect(() => {
    setTotalTravelTime(
      getTotalFlyTime(
        params.flyOption.flyDepartureTime,
        params.flyOption.flyArrivalTime
      )
    );
  }, []);
  const toggleDisplay = () => {
    setDisplay(!display);
  };

  const getTotalFlyTime = (prevDateTime, cDateTime) => {
    //1000 milsec to sec
    const preDate = new Date(prevDateTime);
    const curDate = new Date(cDateTime);

    let diffTime = Math.abs(curDate - preDate);

    let hrs,
      hMints = 0;
    let mints = Number(Math.floor(diffTime / 60000));
    let sec = ((diffTime % 60000) / 1000).toFixed(0);
    hrs = Number(Math.floor(mints / 60));

    if (hrs > 0) {
      hMints = hrs * 60;
    }

    hMints = Number(hMints);
    mints = Number(mints);

    if (hMints > 0) {
      mints = mints - hMints;
    }

    return `${hrs} hr ${mints} min`;
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
          <span>{totalTravelTime}</span>
        </div>
        <div className="line-area">
          <ul className="route-air-line">
            {params.flyOption.airStops &&
              params.flyOption.airStops.map((item, idx) => {
                return <li className="air-point">&nbsp;</li>;
              })}
          </ul>
        </div>
        <div className="line-airport">
          <p>
            {airStop > 0 ? airStop : "Non"} stop {airStop > 0 ? " via" : ""}{" "}
            {params.flyOption.airStops &&
              params.flyOption.airStops.map((stop, i) => {
                return <span>{stop}</span>;
              })}
          </p>
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
                  totalTravelTime={totalTravelTime}
                  travelInf={{
                    firstOrigin: params.flyOption.firstOrigin,
                    lastDestination: params.flyOption.lastDestination,
                  }}
                  flyOption={params.flyOption}
                  fareSummary={params.fareSummary}
                  cancel={params.cancel}
                  change={params.cancel}
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
