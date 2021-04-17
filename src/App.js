import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import { Col, Row, Container } from "react-bootstrap";
import AirSearchForm from "./commponents/searchCompt/AirSearchForm";
import AirSearchResult from "./commponents/airSearch/SearchResults/AirSearchResult";
import PricingDetailsPage from "./commponents/airPricing/pricingDetailsPage";
import RoundTripPricingCard from "./commponents/airPricing/roundTripPricingCard";
import HeaderContent from "./commponents/headerContent";
import Header from "./commponents/header/header";
import FlightsPage from "./pages/FlightsPage";
import EmptyCont from "./commponents/helper/emptyCont";
import HomePage from "./pages/HomePage";
import OneWaySearchResult from "./commponents/airSearch/oneWaySearch/oneWaySearchResult";
import StickyNav from "./commponents/header/nav/stickyNav";
import BookingPage from "./pages/bookingPage";

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
  constructor(props) {
    super(props);

    this.scrollRef = React.createRef();
  }

  state = {
    selectedItemFrom: null,
    adult: null,
    child: null,
    infants: null,
    cabinClass: null,
    selectedItemTo: null,
    stickyNavStatus: false,
    topSectionStatus: true,
  };

  componentDidMount() {
    this.initScrollPositionCount();
  }

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

  initScrollPositionCount = () => {
    window.addEventListener("scroll", (e) => {
      // console.log("Window scroll Event Fire, ", e.target.documentElement.scrollTop);

      let cPosition = e.target.documentElement.scrollTop;

      if (!this.state.stickyNavStatus) {
        if (cPosition >= 90) {
          this.setState({ stickyNavStatus: true, topSectionStatus: false });
          // console.log("First IF Block !!", this.state.stickyNavStatus, " T ", this.state.topSectionStatus);
        }
      }

      if (!this.state.topSectionStatus) {
        if (90 >= cPosition) {
          this.setState({ stickyNavStatus: false, topSectionStatus: true });
          // console.log("2nd IF Block !!", this.state.stickyNavStatus, " T ", this.state.topSectionStatus);
        }
      }
    });
  };

  render() {
    let { stickyNavStatus, topSectionStatus } = this.state;

    // console.log("STK Status: ", stickyNavStatus, " TSS, ", topSectionStatus);
    return (
      <Provider store={store}>
        <Container fluid>
          {/* <EmptyCont height="10px" />*/}
          <StickyNav showStatus={stickyNavStatus} />
          <Router>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/flights" component={FlightsPage} />
            <Route exact path="/booking" component={BookingPage} />
            <Route exact path="/flights/search" component={AirSearchResult} />
            <Route exact path="/air/search" component={AirSearchForm} />
            <Route
              exact
              path="/air/search/result"
              component={AirSearchResult}
            />

            <Route exact path="/pricing" component={PricingDetailsPage} />

            <Route
              exact
              path="/air/rndTrippricing"
              component={RoundTripPricingCard}
            />
          </Router>
        </Container>
      </Provider>
    );
  }
}

export default App;
