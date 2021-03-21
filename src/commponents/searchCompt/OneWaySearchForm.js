import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col, Button } from "react-bootstrap";

import TravellersAndClass from "./travellersAndClass";
import SingleDatePicker from "./SingleDatePicker";
import AutoSearchSuggestionList from "./AutoSearchSuggestionList";

const OneWaySearchForm = (params) => {
  const [lastDate, setLastDate] = useState(new Date());
  const [oneWayDate, setOneWayDate] = useState(new Date());
  return (
    <React.Fragment>
      <Formik
        initialValues={params.oneInitValue}
        onSubmit={(values, actions) => {
          params.getSearchValueAndSubmit(values);
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
                            <Row className="air-search" key={`trip-${indx}`}>
                              <Col md={6} className="no-margin-padding">
                                <Row className="no-margin-padding">
                                  <Col md={6} className="no-margin-padding">
                                    <AutoSearchSuggestionList
                                      title="From"
                                      suggestions={params.sugList}
                                      name={`passDetails[${indx}].from`}
                                      id={`passDetails[${indx}].from`}
                                      getSelectedData={(value) => {
                                        console.log("SLV ", value);
                                        props.setFieldValue(
                                          `passDetails[${indx}].from`,
                                          value !== undefined ? {name:value.name, code:value.iataCode} : null
                                        );

                                        params.getOneWayTripData(props.values);
                                      }}
                                    />
                                  </Col>
                                  <Col md={6} className="no-margin-padding">
                                    <AutoSearchSuggestionList
                                      title="To"
                                      suggestions={params.sugList}
                                      name={`passDetails[${indx}].to`}
                                      id={`passDetails[${indx}].to`}
                                      getSelectedData={(value) => {
                                        console.log("Pre Selected Or S: ", value);
                                        props.setFieldValue(
                                          `passDetails[${indx}].to`,
                                          value !== undefined ? {name:value.name, code:value.iataCode} : null
                                        );
                                        params.getOneWayTripData(props.values);
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col md={3} className="no-margin-padding">
                                <Row className="mp-0">
                                  <Col md={6} className="no-margin-padding">
                                    <SingleDatePicker
                                      preSetDate={params.setLastDate}
                                      getDate={(item) => {
                                        props.setFieldValue(
                                          `passDetails[${indx}].depTime`,
                                          item
                                        );

                                        setLastDate(item);

                                        params.getOneWayTripData(props.values);
                                      }}
                                    />
                                  </Col>
                                  <Col
                                    md={6}
                                    className="no-margin-padding"
                                    onClick={() => {
                                      params.setDataToRoundTrip(props.values);
                                    }}
                                  >
                                    <div className="card cHeight">
                                      <p>&nbsp;</p>
                                      <div className="date-card-body card-body">
                                        <p className="text-disable">
                                          Tap to add a return date for bigger
                                          discounts
                                        </p>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col md={3} className="no-margin-padding">
                                <TravellersAndClass
                                  getAllRangeData={(
                                    adults,
                                    child,
                                    infants,
                                    cabinClass
                                  ) => {

                                    props.setFieldValue(`traveler.ADT`, adults);
                                    props.setFieldValue(`traveler.CNN`, child);
                                    props.setFieldValue(
                                      `traveler.INF`,
                                      infants
                                    );

                                    props.setFieldValue(
                                      `traveler.cabClass`,
                                      cabinClass
                                    );
                                    params.getOneWayTripData(props.values);
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

              <Row>
                <Col md={{ span: 2, offset: 5 }}>
                  <Button type="submit" className="btn btn-block btn-primary">
                    Search
                  </Button>
                </Col>
              </Row>
            </React.Fragment>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default OneWaySearchForm;
