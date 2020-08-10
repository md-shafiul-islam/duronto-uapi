import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import { Col, Row, Container } from "react-bootstrap";
import AirSearchForm from "./commponents/testCompt/AirSearchForm";
import AirSearchResult from "./commponents/airSearch/SearchResults/AirSearchResult";

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
        <Container fluid>
          <Router>
            <AirSearchForm />
            <Route exact="/air/search" component={AirSearchResult} />
          </Router>
        </Container>
      </Provider>
    );
  }
}

export default App;
