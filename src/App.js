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
    selectedItem: null,
    adult: null,
    child: null,
    infants: null,
    cabinClass: null,
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

        <Container fluid>
          <Row>
            <Col md={3}>
              <SearchOption
                title="From"
                populateItem={this.state.selectedItem}
                cardClass="card-hover"
              >
                <AutoCompleteSearch
                  pHolder="Air Port"
                  options={airPort}
                  getSelectedItem={(value) => {
                    this.setState({ selectedItem: value });
                  }}
                />
              </SearchOption>
            </Col>
            <Col md={4}>
              <DatePickerRange
                getStartDate={(sdate) => {
                  this.setStartDate(sdate);
                }}
                getEndDate={(enDate) => {
                  this.setEndDate(enDate);
                }}
              />
            </Col>

            <Col md={5}>
              <TravellersAndClass
                getAllRangeData={(adults, child, infants, cabinClass) => {
                  this.setAllRangeData(adults, child, infants, cabinClass);
                }}
              />
            </Col>
          </Row>
        </Container>

        <Container>
          <label>Date Range Pickre:</label>
          <UseRangDatePicker />
        </Container>
      </Provider>
    );
  }
}

export default App;
