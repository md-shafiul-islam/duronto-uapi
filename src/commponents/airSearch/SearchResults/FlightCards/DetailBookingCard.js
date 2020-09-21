import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { GET_DAYES, GET_MONTHS } from "../../../../actions/types";

const DetailBookingCard = (params) => {
  const [travelTime, setTravelTime] = useState({ min: 0, hr: 0 });

  useEffect(() => {
    getTravelTime(params.bookInf.segment.flightTime);
  }, []);

  const getTravelTime = (timeValue) => {
    let hrMin = 0;

    if (timeValue > 0) {
      let min,
        hr = "";

      hr = timeValue / 60;
      hr = Math.round(hr);
      hrMin = 60 * hr;
      min = Number(timeValue) - hrMin;

      hr = hr < 10 ? `0${hr}` : hr;
      min = min < 10 ? `0${min}` : min;

      setTravelTime({ min: min, hr: hr });
    }
  };

  const getDateFormat = (dateTime) => {
    let localDate = null;
    let day,
      month,
      year = "";

    if (dateTime === undefined) {
      localDate = new Date();
    } else {
      localDate = new Date(dateTime);
    }

    day = GET_DAYES[localDate.getDay()].substring(0, 3);
    month = GET_MONTHS[localDate.getMonth()].substring(0, 3);
    year = localDate.getFullYear().toString().substring(2);

    return `${day}, ${localDate.getDate()} ${month} ${year}`;
  };

  const getTimeFormatHr = (timeValue) => {
    console.log("Date Time Format HR: ", timeValue);
    if (timeValue != undefined) {
      let dateTime = new Date(timeValue);
      let hr = null;

      if (dateTime) {
        hr =
          dateTime.getHours() < 9
            ? `0${dateTime.getHours()}`
            : `${dateTime.getHours()}`;

        console.log(
          "Date Time Format HR Befor Return: ",
          hr,
          " Date HR: ",
          dateTime.getHours()
        );
        return hr;
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

        return min;
      }

      return "00";
    }
  };

  return (
    <React.Fragment>
      <Row className="pd-10">
        <Col md={7}>
          <Row>
            <Col md={12}>
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
            <Col md={12}>
              <Row>
                <Col md={4}>
                  <div className="fly-time-inf">
                    <span className="fly-hour">
                      {getTimeFormatHr(params.bookInf.segment.departureTime)}
                      {":"}
                    </span>
                    <span className="fly-min">
                      {getTimeFormatMin(params.bookInf.segment.departureTime)}
                    </span>
                  </div>
                  <div className="fly-date-time">
                    {getDateFormat(params.bookInf.segment.departureTime)}
                  </div>
                  <div className="fly-loc-inf">
                    <span>
                      {params.bookInf && params.bookInf.segment.origin}
                    </span>
                  </div>
                </Col>

                <Col md={4}>
                  <span className="travel-time">
                    <b>{travelTime.hr}</b> hrs <b>{travelTime.min}</b> min
                  </span>
                </Col>

                <Col md={4}>
                  <div className="fly-time-inf">
                    <span className="fly-hour">
                      {getTimeFormatHr(params.bookInf.segment.arrivalTime)}
                      {":"}
                    </span>
                    <span className="fly-min">
                      {getTimeFormatMin(params.bookInf.segment.arrivalTime)}
                    </span>
                  </div>
                  <div className="fly-date-time">
                    {getDateFormat(params.bookInf.segment.arrivalTime)}
                  </div>
                  <span className="fly-loc-inf">
                    {params.bookInf && params.bookInf.segment.destination}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <p className="">
            <span>BAGGAGE </span>
            <span>Weight</span>
          </p>
          <p className="">
            <span>BAGGAGE </span>
            <span>Weight</span>
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DetailBookingCard;
