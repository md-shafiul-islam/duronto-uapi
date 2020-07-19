import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";

import { PropTypes } from "prop-types";
import UseRangDatePicker from "./useRangDatePicker";

class DatePickerRange extends Component {
  state = {
    startDate: null, //moment(new Date()),
    endDate: null, //moment(new Date()).add(2, "day"),
    display: false,
    focusedInput: null,
  };

  setDatesToState = (selected) => {
    console.log("set Date Run DatePicker");
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

    //this.setState({ startDate: stDate, enDate: enDate });
    this.props.getStartDate(stDate);
    this.props.getEndDate(enDate);

    console.log("Start Date: ", stDate, "End Date: ", enDate);
  };

  toggoleDateRange = (e) => {
    const { display } = this.state;
    this.setState({ display: !display });
    return;
  };
  render() {
    let { display, startDate, endDate } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Title onClick={(e) => this.toggoleDateRange(e)}>
                    DEPARTURE
                  </Card.Title>
                  <Card.Body>
                    <p>{startDate}</p>
                    <p>Day</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Title onClick={(e) => this.toggoleDateRange(e)}>
                    RETURN
                  </Card.Title>
                  <Card.Body>
                    <p>{endDate}</p>
                    <p>Day</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            {display && (
              <Card className="date-picker-card">
                <Card.Body>
                  <UseRangDatePicker
                    getSelectionDate={(selected) =>
                      this.setDatesToState(selected)
                    }
                  />
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default DatePickerRange;
