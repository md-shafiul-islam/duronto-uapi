import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const BookingCardRoundTripOptions = (params) => {
  const [display, setDisplay] = useState(false);
  const [totalTravelTime, setTotalTravelTime] = useState("");
  const [selectedItem, setSelectedItem] = useState(false);

  useEffect(() => {
    setTotalTravelTime();
    /*getTotalFlyTime(
        params.flyItem.flyDepartureTime,
        params.flyItem.flyArrivalTime
      )*/
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
      hMints,
      day = 0;

    let mints = Number(Math.floor(diffTime / 60000));
    let sec = ((diffTime % 60000) / 1000).toFixed(0);
    hrs = Number(Math.floor(mints / 60));

    day = Math.floor(hrs / 24);

    let dayHr = day * 24;
    let dayAfterHr = Math.floor(hrs - dayHr);

    if (hrs > 0) {
      hMints = hrs * 60;
    }

    hMints = Number(hMints);
    mints = Number(mints);

    if (hMints > 0) {
      mints = mints - hMints;
    }

    let timeFare = day > 0 ? `${day} D` : "";

    timeFare += `${hrs} hr ${mints} min`;

    return timeFare;
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

  const getFlyOptionAndTime = (flyOption) => {
    let airStop = "";

    airStop = flyOption.airStops.length;

    return (
      <React.Fragment>
        <div>
          <span>
            {getTotalFlyTime(
              flyOption.flyDepartureTime,
              flyOption.flyArrivalTime
            )}
          </span>
        </div>
        <div className="line-area">
          <ul className="route-air-line">
            {flyOption &&
              flyOption.airStops.map((item, i) => {
                return <li className="air-point">&nbsp;</li>;
              })}
          </ul>
        </div>
        <div className="line-airport-round">
          {airStop > 0 ? airStop : "Non"} stop {airStop > 0 ? " via" : ""}{" "}
          {flyOption.airStops &&
            flyOption.airStops.map((stop, i) => {
              return <span>{stop}</span>;
            })}
        </div>
      </React.Fragment>
    );
  };

  const getCarirers = (carriers, flightNumbers) => {
    let flightItem = "";
    let carrierItem = "";

    carriers.map((carrier, idx) => {
      carrierItem += idx > 0 ? ` | ${carrier}` : `${carrier}`;
    });

    flightNumbers.map((flightNumbers, fIdx) => {
      flightItem += fIdx > 0 ? ` | ${flightNumbers}` : `${flightNumbers}`;
    });

    return `${carrierItem}, ${flightItem}`;
  };

  const toggleSelectedIte = (selectedItem) => {
    const nowSItem = selectedItem;
    setSelectedItem(!nowSItem);
  };

  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Card className="booking-card">
        {params.flyItem &&
          params.flyItem.flyOptions &&
          params.flyItem.flyOptions.map((flyOption, idx) => {
            return (
              <Card.Body
                className={`${
                  params.preSelecteItem.opId === idx &&
                  params.preSelecteItem.elmId === params.elmId
                    ? " op-active "
                    : ""
                }`}
              >
                <React.Fragment>
                  <Row className={`round-trip-title`}>
                    <Col md={12}>
                      <div
                        className="check-box"
                        onClick={() => {
                          toggleSelectedIte(selectedItem);
                          params.getSelectedItem(flyOption, idx, params.elmId);
                        }}
                      >
                        {params.preSelecteItem.opId === idx &&
                        params.preSelecteItem.elmId === params.elmId ? (
                          <i class="far fa-dot-circle"></i>
                        ) : (
                          <i class="far fa-circle"></i>
                        )}
                      </div>
                      <div className="rnd-air-inf">
                        {getCarirers(
                          flyOption.carriers,
                          flyOption.flightNumbers
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row className="round-trip-content">
                    <Col md={2} className="rt-icon">
                      Icon
                    </Col>
                    <Col md={7} className="mp-0">
                      <Row className="rnd-trevel-inf">
                        <Col md={4}>
                          <div className="fly-time-inf">
                            <span className="fly-hour">
                              {getTimeFormatHr(flyOption.flyDepartureTime)}
                              {":"}
                            </span>
                            <span className="fly-min">
                              {getTimeFormatMin(flyOption.flyDepartureTime)}
                            </span>
                          </div>
                          <div className="fly-loc-inf">
                            <span>{flyOption.firstOrigin}</span>
                          </div>
                        </Col>

                        <Col md={4}>
                          <span className="travel-time">
                            {getFlyOptionAndTime(flyOption)}
                          </span>
                        </Col>

                        <Col md={4}>
                          <div className="fly-time-inf">
                            <span className="fly-hour">
                              {getTimeFormatHr(flyOption.flyArrivalTime)}
                              {":"}
                            </span>
                            <span className="fly-min">
                              {getTimeFormatMin(flyOption.flyArrivalTime)}
                            </span>
                          </div>
                          <span className="fly-loc-inf">
                            {flyOption.lastDestination}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={3}>
                      <span className="price">
                        {getPrice(flyOption.totalPrice)}
                      </span>
                    </Col>
                  </Row>
                </React.Fragment>
              </Card.Body>
            );
          })}
      </Card>
    </React.Fragment>
  );
};

export default BookingCardRoundTripOptions;
