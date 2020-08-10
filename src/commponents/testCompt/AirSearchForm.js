import React, { Component } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col } from "react-bootstrap";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import OneWaySearchForm from "./OneWaySearchForm";
import RoundTripSearchForm from "./RoundTripSearchForm";
import MultiCitySearchForm from "./MultiCitySearchForm";
import { addDays } from "date-fns";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getOneWayAirSearchRequest } from "../../actions/airSearchAction";

const airPort = [
  { name: "Aalborg", code: "AAL" },
  { name: "Glasgow GLA Okinawa", code: "OKA" },
  { name: "Aarhus", code: "AAR" },
  { name: "Glasgow, Prestwick", code: "PIK" },
  { name: "Oklahoma City", code: "OKC" },
  { name: "Abadan", code: "ABD" },
  { name: "Goma", code: "GOM" },
  { name: "Omaha", code: "OMA" },
  { name: "Abakan", code: "ABA" },
  { name: "Goodnew Bay", code: "GNU" },
  { name: "Ontario", code: "ONT" },
  { name: "Bombay (Mumbai)", code: "BOM" },
  { name: "Calcutta (Kolkata)", code: "CCU" },
  { name: "Chennai (Madras)	India", code: "MAA" },
  { name: "Delhi", code: "DEL" },
  { name: "Goa	India", code: "GOI" },
];

class AirSearchForm extends Component {
  state = {
    selectedItemFrom: {},
    selectedItemTo: {},
    oneWayInitValue: {
      passDetails: [{ from: "", to: "", depTime: "" }],
      traveler: { ADT: 0, CHD: 0, INF: 0, cabClass: 0 },
      tripCat: null,
    },
    roundInitValue: {
      passDetails: [{ from: "", to: "", depTime: "", returnTime: "" }],
      traveler: { ADT: 0, CHD: 0, INF: 0, cabClass: 0 },
      tripCat: null,
    },

    multyInitValue: {
      passDetails: [
        { from: "", to: "", depTime: "", returnTime: "" },
        { from: "", to: "", depTime: "", returnTime: "" },
      ],
      traveler: { ADT: 0, CHD: 0, INF: 0, cabClass: 0 },
      tripCat: null,
    },

    tripType: "roundTrip",
    lastDate: undefined,
    oneWayDate: undefined,

    preSetRoundTripForm: null,
    preSetRoundTripTo: null,
    preSetRoundTripDepTime: new Date(),
  };

  searchOneWayTrip = (queryData) => {
    console.log("Befor Submit one Search: ", queryData);
    this.props.getOneWayAirSearchRequest(queryData);
    console.log("After Submit one Search: ", queryData);
  };

  setStartDate = (sDate) => {
    console.log("Start Date Formike", sDate);
  };

  setEndDate = (eDate) => {
    //this.setState((roundInitValue:{}));
  };

  setAllRangeData = (adults, child, infants, cabinClass) => {
    console.log("Traveler: ", adults);
  };

  submitForm = (values) => {
    console.log(values);
  };

  changeTripType = (e) => {
    e.preventDefault();

    if (e.target !== undefined && e.target !== null) {
      this.setState({ tripType: e.target.value });
    }
  };

  getCityItem = (name) => {};

  setOneWayTripInf = (values) => {
    console.log(values);
  };

  setDataToRoundTrip = (values) => {
    if (values !== undefined) {
      if (values.passDetails !== undefined) {
        this.setState({ preSetRoundTripForm: values.passDetails[0].from });

        this.setState({ preSetRoundTripTo: values.passDetails[0].to });
        this.setState({
          preSetRoundTripDepTime: values.passDetails[0].depTime,
        });

        this.setState({
          roundInitValue: {
            passDetails: [
              {
                from: values.passDetails[0].from,
                to: values.passDetails[0].to,
                depTime: values.passDetails[0].depTime,
                returnTime: addDays(
                  values.passDetails[0].depTime !== undefined
                    ? values.passDetails[0].depTime
                    : new Date(),
                  5
                ),
              },
            ],
            traveler: { ADT: 0, CHD: 0, INF: 0, cabClass: 0 },
            tripCat: null,
          },
        });

        this.setState({ tripType: "roundTrip" });
      }
    }
  };

  render() {
    let {
      oneWayInitValue,
      roundInitValue,
      multyInitValue,
      lastDate,
      tripType,
      preSetRoundTripDepTime,
      preSetRoundTripForm,
      preSetRoundTripTo,
    } = this.state;
    let setLastDate = lastDate !== undefined ? lastDate : new Date();
    return (
      <React.Fragment>
        <Row className="mp-0">
          <Col md={6}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="tripCat"
                onChange={this.changeTripType}
                value={this.state.tripType}
              >
                <div
                  className={`radio-bg ${tripType === "one" ? "r-active" : ""}`}
                >
                  <FormControlLabel
                    value="one"
                    control={<Radio color="primary" />}
                    label="Oneway"
                    labelPlacement="end"
                  />
                </div>
                <div
                  className={`radio-bg ${
                    tripType === "roundTrip" ? "r-active" : ""
                  }`}
                >
                  <FormControlLabel
                    value="roundTrip"
                    control={<Radio color="primary" />}
                    label="Round Trip"
                    labelPlacement="end"
                  />
                </div>
                <div
                  className={`radio-bg ${
                    tripType === "multiCity" ? "r-active" : ""
                  }`}
                >
                  <FormControlLabel
                    value="multiCity"
                    control={<Radio color="primary" />}
                    label="Multi City"
                    labelPlacement="end"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>

        {this.state.tripType === "one" ? (
          <OneWaySearchForm
            oneInitValue={oneWayInitValue}
            sugList={airPort}
            selectedItemFrom={this.state.selectedItemFrom}
            selectedItemTo={this.state.selectedItemTo}
            getOneWayTripData={(values) => {
              this.setOneWayTripInf(values);
            }}
            setAllRangeData={this.setAllRangeData}
            setDataToRoundTrip={this.setDataToRoundTrip}
            getSearchValueAndSubmit={this.searchOneWayTrip}
          />
        ) : (
          ""
        )}

        {this.state.tripType === "roundTrip" ? (
          <RoundTripSearchForm
            sugList={airPort}
            roundInitValue={roundInitValue}
            selectedItemTo={this.state.selectedItemTo}
            oneWayDate={preSetRoundTripDepTime}
            setAllRangeData={this.setAllRangeData}
            preSetRoundTripForm={preSetRoundTripForm}
            preSetRoundTripTo={preSetRoundTripTo}
          />
        ) : (
          ""
        )}

        {this.state.tripType === "multiCity" ? (
          <MultiCitySearchForm
            multyInitValue={multyInitValue}
            sugList={airPort}
            setLastDate={setLastDate}
            setAllRangeData={this.setAllRangeData}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

AirSearchForm.prototypes = {
  getOneWayAirSearchRequest: PropTypes.func.isRequired,
};

export default connect(null, { getOneWayAirSearchRequest })(AirSearchForm);
