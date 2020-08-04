import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import AutoCompleteSearch from "./commponents/testCompt/autoCompleteSearch";
import SearchOption from "./commponents/testCompt/searchOption";
import ComRange from "./commponents/testCompt/comRange";

import TravellersAndClass from "./commponents/testCompt/travellersAndClass";
import { Col, Row, Container } from "react-bootstrap";
import UseRangDatePicker from "./commponents/testCompt/useRangDatePicker";
import DatePickerRange from "./commponents/testCompt/datePickerRange";
import AirSearchForm from "./commponents/testCompt/AirSearchForm";
import SingleDatePicker from "./commponents/testCompt/SingleDatePicker";

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

class App extends Component {
  state = {
    selectedItemFrom: null,
    adult: null,
    child: null,
    infants: null,
    cabinClass: null,
    selectedItemTo: null,
  };

  setStartDate = (stDate) => {
    console.log(stDate);
  };

  setEndDate = (enDate) => {
    console.log(enDate);
  };

  setAllRangeData = (adt, child, infants, cabinClass) => {
    console.log("All Data: ", adt, child, infants, cabinClass);
    this.setState({ adult: adt, child: child, infants: infants });
  };

  render() {
    return (
      <Provider store={store}>
        {/*<SearchLowFareAir />}        
        <SendRequestAirSearch />*/}

        <Container>
          <Row className="air-search">
            <Col md={6} className="no-margin-padding">
              <Row className="no-margin-padding">
                <Col md={6} className="no-margin-padding">
                  <SearchOption
                    title="From"
                    populateItem={this.state.selectedItemFrom}
                    cardClass="card-hover"
                  >
                    <AutoCompleteSearch
                      pHolder="From"
                      options={airPort}
                      getSelectedItem={(value) => {
                        this.setState({ selectedItemFrom: value });
                      }}
                      fName="from"
                      fId="from"
                    />
                  </SearchOption>
                </Col>
                <Col md={6} className="no-margin-padding">
                  <SearchOption
                    title="To"
                    populateItem={this.state.selectedItemTo}
                    cardClass="card-hover"
                  >
                    <AutoCompleteSearch
                      pHolder="To"
                      options={airPort}
                      getSelectedItem={(value) => {
                        this.setState({ selectedItemTo: value });
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
                }}
                getEndDate={(enDate) => {
                  this.setEndDate(enDate);
                }}
              />
            </Col>

            <Col md={3} className="no-margin-padding">
              <TravellersAndClass
                getAllRangeData={(adults, child, infants, cabinClass) => {
                  this.setAllRangeData(adults, child, infants, cabinClass);
                }}
              />
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <AirSearchForm />
        </Container>

        <Container>
          <SingleDatePicker
            getDate={(date) => {
              console.log(date);
            }}
          />
        </Container>
      </Provider>
    );
  }
}

export default App;
