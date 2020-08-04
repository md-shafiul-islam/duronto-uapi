import React, { Component } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col } from "react-bootstrap";
import AutoCompleteSearch from "./autoCompleteSearch";
import SearchOption from "./searchOption";
import DatePickerRange from "./datePickerRange";
import TravellersAndClass from "./travellersAndClass";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AutoSearchSuggestionList from "./AutoSearchSuggestionList";
import SingleDatePicker from "./SingleDatePicker";

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

  render() {
    let {
      oneWayInitValue,
      roundInitValue,
      multyInitValue,
      lastDate,
      tripType,
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
          <React.Fragment>
            <Formik
              initialValues={oneWayInitValue}
              onSubmit={(values, actions) => {
                this.submitForm(values);
              }}
            >
              {(props) => (
                <Form>
                  <React.Fragment>
                    <Row className="mp-0">
                      <Col md={12}>
                        <FieldArray name="passDetails">
                          {({ push, remove }) => (
                            <React.Fragment>
                              {props.values.passDetails &&
                                props.values.passDetails.map((item, indx) => (
                                  <Row
                                    className="air-search"
                                    key={`trip-${indx}`}
                                  >
                                    <Col md={6} className="no-margin-padding">
                                      <Row className="no-margin-padding">
                                        <Col
                                          md={6}
                                          className="no-margin-padding"
                                        >
                                          <SearchOption
                                            title="From"
                                            populateItem={
                                              this.state.selectedItemFrom
                                            }
                                            cardClass="card-hover"
                                          >
                                            <AutoCompleteSearch
                                              pHolder="From"
                                              options={airPort}
                                              getSelectedItem={(value) => {
                                                props.setFieldValue(
                                                  `passDetails[${indx}].from`,
                                                  value.name
                                                );
                                                this.setState({
                                                  selectedItemFrom: value,
                                                });
                                              }}
                                              fName="from"
                                              fId="from"
                                            />
                                          </SearchOption>
                                        </Col>
                                        <Col
                                          md={6}
                                          className="no-margin-padding"
                                        >
                                          <SearchOption
                                            title="To"
                                            populateItem={
                                              this.state.selectedItemTo
                                            }
                                            cardClass="card-hover"
                                          >
                                            <AutoCompleteSearch
                                              pHolder="To"
                                              options={airPort}
                                              getSelectedItem={(value) => {
                                                props.setFieldValue(
                                                  `passDetails[${indx}].to`,
                                                  value.name
                                                );

                                                this.setState({
                                                  selectedItemTo: value,
                                                });
                                              }}
                                              fName="to"
                                              fId="to"
                                            />
                                          </SearchOption>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={3} className="no-margin-padding">
                                      <SingleDatePicker
                                        preSetDate={setLastDate}
                                        getDate={(item) => {
                                          props.setFieldValue(
                                            `passDetails[${indx}].sdate`,
                                            item
                                          );

                                          this.setState({ lastDate: item });
                                        }}
                                      />
                                    </Col>

                                    <Col md={3} className="no-margin-padding">
                                      <TravellersAndClass
                                        getAllRangeData={(
                                          adults,
                                          child,
                                          infants,
                                          cabinClass
                                        ) => {
                                          this.setAllRangeData(
                                            adults,
                                            child,
                                            infants,
                                            cabinClass
                                          );

                                          props.setFieldValue(
                                            `traveler.ADT`,
                                            adults
                                          );
                                          props.setFieldValue(
                                            `traveler.CHD`,
                                            child
                                          );
                                          props.setFieldValue(
                                            `traveler.INF`,
                                            infants
                                          );
                                          props.setFieldValue(
                                            `traveler.cabClass`,
                                            cabinClass
                                          );
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                ))}
                            </React.Fragment>
                          )}
                        </FieldArray>
                      </Col>
                    </Row>
                  </React.Fragment>
                </Form>
              )}
            </Formik>
          </React.Fragment>
        ) : (
          ""
        )}

        {this.state.tripType === "roundTrip" ? (
          <React.Fragment>
            <Formik
              enableReinitialize={true}
              initialValues={roundInitValue}
              onSubmit={(values, actions) => {
                this.submitForm(values);
              }}
            >
              {(props) => (
                <Form>
                  <React.Fragment>
                    <Row className="mp-0">
                      <Col md={12}>
                        <FieldArray name="passDetails">
                          {({ push, remove }) => (
                            <React.Fragment>
                              {props.values.passDetails &&
                                props.values.passDetails.map((item, indx) => (
                                  <Row
                                    className="air-search"
                                    key={`trip-${indx}`}
                                  >
                                    <Col md={6} className="no-margin-padding">
                                      <Row className="no-margin-padding">
                                        <Col
                                          md={6}
                                          className="no-margin-padding"
                                        >
                                          <AutoSearchSuggestionList
                                            title="From"
                                            suggestions={airPort}
                                            name={`passDetails[${indx}].from`}
                                            id={`passDetails[${indx}].from`}
                                            getSelectedData={(value) => {
                                              props.setFieldValue(
                                                `passDetails[${indx}].from`,
                                                value
                                              );
                                            }}
                                          />
                                        </Col>
                                        <Col
                                          md={6}
                                          className="no-margin-padding"
                                        >
                                          <SearchOption
                                            title="To"
                                            populateItem={
                                              this.state.selectedItemTo
                                            }
                                            cardClass="card-hover"
                                          >
                                            <AutoCompleteSearch
                                              pHolder="To"
                                              options={airPort}
                                              getSelectedItem={(value) => {
                                                props.setFieldValue(
                                                  `passDetails[${indx}].to`,
                                                  value.name
                                                );

                                                this.setState({
                                                  selectedItemTo: value,
                                                });
                                              }}
                                              fName="to"
                                              fId="to"
                                            />
                                          </SearchOption>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={3} className="no-margin-padding">
                                      <DatePickerRange
                                        getStartDate={(sdate) => {
                                          this.setStartDate(sdate);
                                          props.setFieldValue(
                                            `passDetails[${indx}].depTime`,
                                            sdate
                                          );
                                        }}
                                        getEndDate={(enDate) => {
                                          this.setEndDate(enDate);
                                          props.setFieldValue(
                                            `passDetails[${indx}].returnTime`,
                                            enDate
                                          );
                                        }}
                                      />
                                    </Col>

                                    <Col md={3} className="no-margin-padding">
                                      <TravellersAndClass
                                        getAllRangeData={(
                                          adults,
                                          child,
                                          infants,
                                          cabinClass
                                        ) => {
                                          this.setAllRangeData(
                                            adults,
                                            child,
                                            infants,
                                            cabinClass
                                          );

                                          props.setFieldValue(
                                            `traveler.ADT`,
                                            adults
                                          );
                                          props.setFieldValue(
                                            `traveler.CHD`,
                                            child
                                          );
                                          props.setFieldValue(
                                            `traveler.INF`,
                                            infants
                                          );
                                          props.setFieldValue(
                                            `traveler.cabClass`,
                                            cabinClass
                                          );
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                ))}
                            </React.Fragment>
                          )}
                        </FieldArray>
                      </Col>
                    </Row>
                  </React.Fragment>
                </Form>
              )}
            </Formik>
          </React.Fragment>
        ) : (
          ""
        )}

        {this.state.tripType === "multiCity" ? (
          <React.Fragment>
            <Formik
              initialValues={multyInitValue}
              onSubmit={(values, actions) => {
                this.submitForm(values);
              }}
            >
              {(props) => (
                <Form>
                  <React.Fragment>
                    <Row className="mp-0">
                      <Col md={12}>
                        <FieldArray name="passDetails">
                          {({ push, remove }) => (
                            <React.Fragment>
                              {props.values.passDetails &&
                                props.values.passDetails.map((item, indx) => (
                                  <Row
                                    className="air-search"
                                    key={`trip-${indx}`}
                                  >
                                    {console.log("Multy City: index", indx)}
                                    <Col md={6} className="no-margin-padding">
                                      <Row className="no-margin-padding">
                                        <Col
                                          md={6}
                                          className="no-margin-padding"
                                        >
                                          <AutoSearchSuggestionList
                                            title="From"
                                            suggestions={airPort}
                                            name={`passDetails[${indx}].from`}
                                            id={`passDetails[${indx}].from`}
                                            getSelectedData={(value) => {
                                              props.setFieldValue(
                                                `passDetails[${indx}].from`,
                                                value
                                              );
                                            }}
                                          />
                                        </Col>
                                        <Col
                                          md={6}
                                          className="no-margin-padding"
                                        >
                                          <AutoSearchSuggestionList
                                            title="TO"
                                            suggestions={airPort}
                                            name={`passDetails[${indx}].to`}
                                            id={`passDetails[${indx}].to`}
                                            getSelectedData={(value) => {
                                              props.setFieldValue(
                                                `passDetails[${indx}].to`,
                                                value
                                              );
                                            }}
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={2} className="no-margin-padding">
                                      <SingleDatePicker
                                        preSetDate={setLastDate}
                                        getDate={(item) => {
                                          props.setFieldValue(
                                            `passDetails[${indx}].sdate`,
                                            item
                                          );

                                          this.setState({ lastDate: item });
                                        }}
                                      />
                                    </Col>

                                    <Col md={3} className="no-margin-padding">
                                      {indx === 0 ? (
                                        <TravellersAndClass
                                          getAllRangeData={(
                                            adults,
                                            child,
                                            infants,
                                            cabinClass
                                          ) => {
                                            this.setAllRangeData(
                                              adults,
                                              child,
                                              infants,
                                              cabinClass
                                            );

                                            props.setFieldValue(
                                              `traveler.ADT`,
                                              adults
                                            );
                                            props.setFieldValue(
                                              `traveler.CHD`,
                                              child
                                            );
                                            props.setFieldValue(
                                              `traveler.INF`,
                                              infants
                                            );
                                            props.setFieldValue(
                                              `traveler.cabClass`,
                                              cabinClass
                                            );
                                          }}
                                        />
                                      ) : (
                                        <Row>
                                          <Col md={8} className="ptop">
                                            <a
                                              className=" btn btn-block btn-outline-primary btn-xs"
                                              href="javascript:void(0);"
                                              onClick={() =>
                                                push({
                                                  from: "",
                                                  to: "",
                                                  depTime: "",
                                                })
                                              }
                                            >
                                              ADD ANOTHER CITY
                                            </a>
                                          </Col>
                                          {indx > 1 ? (
                                            <Col md={4} className="ptop">
                                              <span
                                                onClick={() => remove(indx)}
                                                className=" btn btn-block btn-outline-danger btn-xs"
                                              >
                                                <i class="fas fa-backspace"></i>
                                              </span>
                                            </Col>
                                          ) : (
                                            ""
                                          )}
                                        </Row>
                                      )}
                                    </Col>
                                  </Row>
                                ))}
                            </React.Fragment>
                          )}
                        </FieldArray>
                      </Col>
                    </Row>
                  </React.Fragment>
                </Form>
              )}
            </Formik>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default AirSearchForm;
