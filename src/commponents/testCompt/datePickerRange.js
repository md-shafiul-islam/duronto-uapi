import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

import { PropTypes } from "prop-types";
import UseRangDatePicker from "./useRangDatePicker";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, DateRange } from "react-date-range";
import { addDays } from "date-fns";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DatePickerRange = (props) => {
  const refDate = useRef(null);
  const [display, setDisplay] = useState(true);
  const [focusStatus, setFocusStatus] = useState([0, 0]);
  const [changeFocus, setChangeFocus] = useState([0, 0]);
  const [returnStatus, setReturnStatus] = useState(false);
  const [retDisplay, setRetDisplay] = useState(true);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      key: "selection",
    },
  ]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    console.log("Event add to Card");

    function handleClickOutside(event) {
      if (refDate.current && !refDate.current.contains(event.target)) {
        console.log("Display Status: ", display);
        if (display === true) {
          setDisplay(false);
        }

        if (retDisplay) {
          setRetDisplay(false);
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refDate]);

  useEffect(() => {
    setDisplay(!display);
    setRetDisplay(!retDisplay);
    return;
  }, []);

  const changeHandeller = (item) => {
    setState([item.selection]);

    console.log("Date State Item: ", state);

    let selected = item.selection;

    let stDate =
      selected !== undefined
        ? selected.startDate !== undefined
          ? selected.startDate
          : ""
        : "";
    let enDate =
      selected !== undefined
        ? selected.endDate !== undefined
          ? selected.endDate
          : ""
        : "";

    props.getStartDate(stDate);
    props.getEndDate(enDate);

    if (changeFocus[1] === 1) {
      setDisplay(false);
    }

    console.log(
      "Change Fire Item ",
      item.selection.endDate,
      " Prev Date: ",
      enDate
    );

    console.log("Focus ", changeFocus);
    if (item.selection.endDate && returnStatus) {
      setRetDisplay(false);
    }

    if (props.oneWayTrip && returnStatus) {
      props.roundGetAction();
    }
  };

  const toggoleDateRange = (e, status) => {
    console.log("Status: ", status);

    setFocusStatus(status);
    setReturnStatus(true);
    setRetDisplay(!retDisplay);

    if (status[1] === 1) {
      state[0].endDate = null;
    }

    console.log("C Status Return Date: ", state);
  };

  const toggoleDateRangeDep = (e, status) => {
    if (status[0] === 0) {
      state[0].endDate = null;
    }

    setReturnStatus(false);
    setDisplay(!display);
    setFocusStatus(status);
  };

  const getStringMonth = (month, lenght) => {
    let stMonth = months[month].toString().substring(0, lenght);
    return `${stMonth}'`;
  };

  const getStringYear = (year, lenght) => {
    return year.toString().substring(0, lenght);
  };

  return (
    <React.Fragment>
      <Row ref={refDate}>
        <Col md={12}>
          <Row className="mp-0">
            <Col md={6} className="no-margin-padding">
              <Card>
                <Card.Title
                  className="com-title"
                  onClick={(e) => toggoleDateRangeDep(e, [0, 0])}
                >
                  DEPARTURE &nbsp;{" "}
                  <i
                    class="fas fa-angle-down icon-trans"
                    style={{
                      transform: `${display ? "rotateZ(-180deg)" : ""}`,
                    }}
                  ></i>
                </Card.Title>
                <Card.Body
                  className="date-card-body"
                  onClick={(e) => toggoleDateRangeDep(e, [0, 0])}
                >
                  <p>
                    {state && state[0].startDate && (
                      <React.Fragment>
                        <span className="search-bstyle">
                          {state[0].startDate.getDate()}
                        </span>
                        <span className="search-nstyle">
                          &nbsp;
                          {getStringMonth(state[0].startDate.getMonth(), 3)}
                          {getStringYear(
                            state[0].startDate.getFullYear(),
                            2
                          )}{" "}
                        </span>
                      </React.Fragment>
                    )}
                  </p>
                  <p>
                    {state &&
                      state[0].startDate &&
                      `${days[state[0].startDate.getDay()]}`}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="no-margin-padding">
              <Card>
                <Card.Title
                  className="com-title"
                  onClick={(e) => toggoleDateRange(e, [0, 1])}
                >
                  RETURN &nbsp;{" "}
                  <i
                    class="fas fa-angle-down icon-trans"
                    style={{
                      transform: `${retDisplay ? "rotateZ(-180deg)" : ""}`,
                    }}
                  ></i>
                </Card.Title>
                <Card.Body
                  className="date-card-body"
                  onClick={(e) => toggoleDateRange(e, [0, 1])}
                >
                  {props.oneWayTrip === true ? (
                    <p className="text-disable">
                      Tap to add a return date for bigger discounts
                    </p>
                  ) : (
                    <React.Fragment>
                      <p>
                        {state && state[0].endDate && (
                          <React.Fragment>
                            <span className="search-bstyle">
                              {state[0].endDate.getDate()}
                            </span>
                            <span className="search-nstyle">
                              &nbsp;
                              {getStringMonth(state[0].endDate.getMonth(), 3)}
                              {getStringYear(state[0].endDate.getFullYear(), 2)}
                            </span>
                          </React.Fragment>
                        )}
                      </p>
                      <p>
                        {state &&
                          state[0].endDate &&
                          `${days[state[0].endDate.getDay()]}`}
                      </p>
                    </React.Fragment>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          {display || retDisplay ? (
            <Card className="date-picker-card">
              <Card.Body>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => changeHandeller(item)}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  initialFocusedRange={focusStatus}
                  onRangeFocusChange={(e) => setChangeFocus(e)}
                  startDatePlaceholder="Departure"
                  endDatePlaceholder="Return"
                />
              </Card.Body>
            </Card>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DatePickerRange;
