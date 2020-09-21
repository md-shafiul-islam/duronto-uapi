import React, { useState } from "react";
import { Tabs, Tab, Nav, Row, Col } from "react-bootstrap";
import FlyDetailsCard from "./FlightCards/FlyDetailsCard";
import ChargeCardDetails from "./FlightCards/ChargeCardDetails";
import FareSummaryCard from "./FlightCards/FareSummaryCard";
import SelectedAirDetails from "./SelectedAirDetails";
import DetailBookingCard from "./FlightCards/DetailBookingCard";

const SelectedTab = (props) => {
  const [key, setKey] = useState("flightDetails");

  const selectedBookingOptionAction = (ids, item) => {
    props.getSelectedOption(item, ids);
  };

  let prevArvTime = "";

  const setLauoverInf = (prevDateTime, cDateTime) => {
    console.log("P time: ", prevDateTime, " C Date: ", cDateTime);
    //1000 milsec to sec
    const preDate = new Date(prevDateTime);
    const curDate = new Date(cDateTime);

    console.log("After P Hr: ", preDate, " C Hr: ", curDate);

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

  return (
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
              {props.bookInfos &&
                props.bookInfos.map((book, ibx) => {
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
                        <Row className="layover">
                          <Col md={12} className="layover-position">
                            <div className="border-center "></div>
                            <div className="layover-overlay-conten">
                              <Row>
                                <Col
                                  md={{ span: 6, offset: 3 }}
                                  className="layover-content "
                                >
                                  <p>
                                    Change of Planes | {timeDeff} layover in{" "}
                                    {origin}
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}

                      <DetailBookingCard bookInf={book} />
                    </React.Fragment>
                  );
                })}
            </Tab.Pane>
            <Tab.Pane eventKey="fareSummary"></Tab.Pane>
            <Tab.Pane eventKey="cancellation"></Tab.Pane>
            <Tab.Pane eventKey="dateChange"></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default SelectedTab;
