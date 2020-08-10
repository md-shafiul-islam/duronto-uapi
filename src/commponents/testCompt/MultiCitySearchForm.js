import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col } from "react-bootstrap";
import AutoCompleteSearch from "./autoCompleteSearch";
import SearchOption from "./searchOption";
import DatePickerRange from "./datePickerRange";
import TravellersAndClass from "./travellersAndClass";
import AutoSearchSuggestionList from "./AutoSearchSuggestionList";
import SingleDatePicker from "./SingleDatePicker";

const MultiCitySearchForm = (params) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={params.multyInitValue}
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
                            <Row className="air-search" key={`trip-${indx}`}>
                              {console.log("Multy City: index", indx)}
                              <Col md={6} className="no-margin-padding">
                                <Row className="no-margin-padding">
                                  <Col md={6} className="no-margin-padding">
                                    <AutoSearchSuggestionList
                                      title="From"
                                      suggestions={params.sugList}
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
                                  <Col md={6} className="no-margin-padding">
                                    <AutoSearchSuggestionList
                                      title="TO"
                                      suggestions={params.sugList}
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
                                  preSetDate={params.setLastDate}
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
  );
};

export default MultiCitySearchForm;
