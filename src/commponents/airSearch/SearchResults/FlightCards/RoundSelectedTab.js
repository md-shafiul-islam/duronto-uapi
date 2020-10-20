import React, { useState, useEffect } from "react";
import { Tabs, Tab, Nav, Row, Col, Card } from "react-bootstrap";
import { GET_MONTHS } from "../../../../actions/types";

import RoundTripDetails from "./RoundTripDetails";

const RoundSelectedTab = (params) => {
  const [key, setKey] = useState("flightDetails");

  const selectedBookingOptionAction = (ids, item) => {
    params.getSelectedOption(item, ids);
  };

  let prevArvTime = "";

  let { departureOption, returnOption } = params.flyOption;

  const getDayAndMonth = (dateTime) => {
    if (dateTime === undefined) {
      return "";
    }
    let localDate = null;
    let month,
      dayOfMonth = 0;

    if (dateTime === undefined) {
      localDate = new Date();
    } else {
      localDate = new Date(dateTime);
    }

    month = GET_MONTHS[localDate.getMonth()].substring(0, 3);
    dayOfMonth = localDate.getDate();
    return `${dayOfMonth} ${month}`;
  };

  const setLauoverInf = (prevDateTime, cDateTime) => {
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
      hMints = Number(hMints);
    }

    if (hMints > 0) {
      mints = mints - hMints;
    }

    prevArvTime = "";
    return `${hrs} hr ${mints} min`;
  };

  const getTravelLocation = (locCode) => {
    if (locCode === undefined) {
      return "";
    }

    if (locCode === null) {
      return "";
    }

    return locCode;
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

  return (
    <React.Fragment>
      <Tab.Container id="menu-tabs" defaultActiveKey="flightDetails">
        <Row>
          <Col sm={12}>
            <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link eventKey="flightDetails">Flight Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fareSummary">Fare Summary</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="cancellation">Cancellation</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="dateChange">Date Change</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="flightDetails">
                <Row className="rnd-tvdtls-row">
                  <Col md={6} className="rnd-travel-details">
                    <div className="rnd-dcontent">
                      <Row className="rnd-travel-locs">
                        <Col md={6} className="rnd-travel-title-inf">
                          {getTravelLocation(
                            departureOption && departureOption.firstOrigin
                          )}{" "}
                          To{" "}
                          {getTravelLocation(
                            departureOption && departureOption.lastDestination
                          )}
                          ,{" "}
                          {getDayAndMonth(
                            departureOption && departureOption.flyDepartureTime
                          )}
                        </Col>
                        <Col md={6} className="rnd-travel-title-time">
                          {departureOption !== null
                            ? getTotalFlyTime(
                                departureOption.flyDepartureTime,
                                departureOption.flyArrivalTime
                              )
                            : ""}
                        </Col>
                      </Row>

                      {departureOption &&
                        departureOption.bookInfos &&
                        departureOption.bookInfos.map((book, ibx) => {
                          let { fareInfos, segment } = book;
                          let timeDeff = "";
                          let { origin } = segment;
                          if (prevArvTime !== undefined) {
                            if (prevArvTime.length > 3) {
                              timeDeff = setLauoverInf(
                                prevArvTime,
                                segment.departureTime
                              );
                            }
                          }
                          prevArvTime = segment && segment.arrivalTime;

                          return (
                            <React.Fragment>
                              {ibx > 0 ? (
                                <Row className="rnd-layover">
                                  <Col md={12} className="rnd-layover-position">
                                    <div className="rnd-layover-overlay-container"></div>
                                    <div className="rnd-layover-content">
                                      <p>
                                        Change of Planes | {timeDeff} Layover in{" "}
                                        {origin}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              ) : (
                                ""
                              )}

                              <RoundTripDetails bookInf={book} />
                            </React.Fragment>
                          );
                        })}
                    </div>
                  </Col>
                  <Col md={6} className="rnd-travel-details">
                    <div className="rnd-dcontent">
                      <Row className="rnd-travel-locs">
                        <Col md={6} className="rnd-travel-title-inf">
                          {getTravelLocation(
                            returnOption && returnOption.firstOrigin
                          )}{" "}
                          To{" "}
                          {getTravelLocation(
                            returnOption && returnOption.lastDestination
                          )}
                          ,{" "}
                          {getDayAndMonth(
                            returnOption && returnOption.flyDepartureTime
                          )}
                        </Col>
                        <Col md={6} className="rnd-travel-title-time">
                          {returnOption !== null
                            ? getTotalFlyTime(
                                returnOption.flyDepartureTime,
                                returnOption.flyArrivalTime
                              )
                            : ""}
                        </Col>
                      </Row>

                      {returnOption &&
                        returnOption.bookInfos &&
                        returnOption.bookInfos.map((book, ibx) => {
                          let { fareInfos, segment } = book;
                          let timeDeff = "";
                          let { origin } = segment;
                          if (prevArvTime !== undefined) {
                            if (prevArvTime.length > 3) {
                              timeDeff = setLauoverInf(
                                prevArvTime,
                                segment.departureTime
                              );
                            }
                          }
                          prevArvTime = segment && segment.arrivalTime;

                          return (
                            <React.Fragment>
                              {ibx > 0 ? (
                                <Row className="rnd-layover">
                                  <Col md={12} className="rnd-layover-position">
                                    <div className="rnd-layover-overlay-container"></div>
                                    <div className="rnd-layover-content">
                                      <p>
                                        Change of Planes | {timeDeff} Layover in{" "}
                                        {origin}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              ) : (
                                ""
                              )}

                              <RoundTripDetails bookInf={book} />
                            </React.Fragment>
                          );
                        })}
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="fareSummary">
                {/*<FareSummaryCard fareSummary={params.fareSummary} />*/}
              </Tab.Pane>

              <Tab.Pane eventKey="cancellation">
                {/*<ChargeCardDetails data={params.cancel} />*/}
              </Tab.Pane>
              <Tab.Pane eventKey="dateChange">
                {/*<ChargeCardDetails data={params.cancel} />*/}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

export default RoundSelectedTab;
