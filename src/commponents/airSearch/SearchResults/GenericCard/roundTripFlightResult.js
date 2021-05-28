import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import HelperLoader from "../../../helper/helperLoader";
import {
  setSelectedPrcingDetailsRoundTrip,
  setPriceRoundTrip,
  getPriceSearchAction,
} from "../../../../actions/priceAction";
import BookingCardRoundTripOptions from "../FlightCards/BookingCardRoundTripOptions";
import StickyCard from "../FlightCards/StickyCard";
import { helperGetPriceReqQuery } from "../../../../actions/helperAction";
import { helperIsEmpty } from "../../../helper/helperAction";
import LoaderSpiner from "../../../helper/loaderSpiner";
import { localDataStore } from "../../../helper/localDataStore";
import { flightModifiers } from "../../../helper/flightModifiers";

class RoundTripFlightResult extends Component {
  state = {
    response: null,
    departureFlights: [],
    retFlights: [],
    prePerdStatus: true,
    selectedFlights: new Map(),
    preSelectIdx: { departureFlight: "dep-0", retFlight: "ret-0" },
    priceReqStatus: false,
    returnFlightsRes: {},
    departureFlightsRes: {},
    depBaseInf: { currencyType: "", brands: [], traceId: "", routeList: [] },
    retBaseInf: { currencyType: "", brands: [], traceId: "", routeList: [] },
    depDataStatus: false,
    retDataStatus: false,
    loadingPropsStatus: false,
    retLegs: {},
    depLegs: {},
    searchStatus: false,
  };

  componentDidMount() {
    console.log("RTFR Search type,", this.props.type);
    console.log("RTFR Search Query, ", this.props.searchQuery);

    if (!helperIsEmpty(this.props.searchQuery)) {
      let { depQuery, retQuery } = this.props && this.props.searchQuery;

      if (!helperIsEmpty(depQuery) && !helperIsEmpty(retQuery)) {
        this.setState({
          depLegs: depQuery.airLegReqs,
          retLegs: retQuery.airLegReqs,
          searchStatus: true,
        });
      } else {
        this.setState({
          departureFlightsRes: localDataStore.getDepartureFlights(),
          returnFlightsRes: localDataStore.getReturnFlights(),
        });
        setTimeout(() => {
          console.log("Interval Block");
          this.initAirSearch("Commponet will receive props");
        }, 500);
        this.initAirSearch("Commponent Did Mount");
      }
    } else {
      this.setState({
        departureFlightsRes: localDataStore.getDepartureFlights(),
        returnFlightsRes: localDataStore.getReturnFlights(),
      });
      setTimeout(() => {
        console.log("Interval Block");
        this.initAirSearch("Commponet will receive props");
      }, 500);
      this.initAirSearch("Commponent Did Mount");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!helperIsEmpty(nextProps)) {
      if (nextProps.departureResStatus && nextProps.departureResStatus) {
        this.setState({
          departureFlightsRes: localDataStore.getDepartureFlights(),
          returnFlightsRes: localDataStore.getReturnFlights(),
          loadingPropsStatus: true,
        });

        setTimeout(() => {
          console.log("Interval Block");
          this.initAirSearch("Commponet will receive props");
        }, 500);
      } else {
        this.setState({
          departureFlightsRes: localDataStore.getDepartureFlights(),
          returnFlightsRes: localDataStore.getReturnFlights(),
        });
      }
    }
  }

  initAirSearch = (via) => {
    console.log("Run Via ", via);
    console.log(
      "this.state.departureFlightsRes ",
      this.state.departureFlightsRes
    );
    console.log("this.state.returnFlightsRes ", this.state.returnFlightsRes);

    if (helperIsEmpty(this.state.departureFlightsRes)) return;
    if (helperIsEmpty(this.state.returnFlightsRes)) return;
    // if (helperIsEmpty(nProps.searchResponse)) return;
    let depFlight = flightModifiers.getRoundTripFlights(
      this.state.departureFlightsRes,
      "Departure ",
      this.depFlightInitStatus
    );
    let retFlight = flightModifiers.getRoundTripFlights(
      this.state.returnFlightsRes,
      "Return ",
      this.retFlightInitStatus
    );

    console.log("depFlight, ", depFlight, " retFlight, ", retFlight);

    let { currencyType, brands, traceId, routeList } =
      this.state.departureFlightsRes && this.state.departureFlightsRes.response;

    this.setState({
      departureFlights: depFlight ? depFlight : null,
      retFlights: retFlight ? retFlight : null,
      retBaseInf: {
        currencyType: this.state.returnFlightsRes.response.currencyType,
        brands: this.state.returnFlightsRes.response.brands,
        traceId: this.state.returnFlightsRes.response.traceId,
        routeList: this.state.returnFlightsRes.response.routeList,
      },
      depBaseInf: { currencyType, brands, traceId, routeList },
      prePerdStatus: false,
    });
    console.log("After set State ");
  };

  retFlightInitStatus = (status) => {};

  depFlightInitStatus = (status) => {};

  changeLodingStatus = (data) => {
    console.log("Price Request Done ... Data, ", data);
    this.setState({ priceReqStatus: false });
  };

  setSelectedAir = (airOption) => {
    let { selectedIdx, flight, key } = airOption;
    let depQuery = {},
      retQuery = {};
    this.setState({ priceReqStatus: true });
    if (key === "dep") {
      depQuery = helperGetPriceReqQuery(
        flight,
        this.props.searchQuery,
        this.state.depBaseInf.traceId
      );
      this.props.getPriceSearchAction(depQuery, 1, this.changeLodingStatus);
      this.state.selectedFlights.set(key, flight);
      this.setState({
        preSelectIdx: {
          departureFlight: selectedIdx,
          retFlight: this.state.preSelectIdx.retFlight,
        },
      });
    }

    if (key === "ret") {
      retQuery = helperGetPriceReqQuery(
        flight,
        this.props.searchQuery,
        this.state.retBaseInf.traceId
      );
      this.props.getPriceSearchAction(retQuery, 0, this.changeLodingStatus);

      this.state.selectedFlights.set(key, flight);
      this.setState({
        preSelectIdx: {
          departureFlight: this.state.preSelectIdx.departureFlight,
          retFlight: selectedIdx,
        },
      });
    }

    this.updatePriceSelectedItem();
  };

  updatePriceSelectedItem = () => {
    let { selectedFlights } = this.state;
    const airOptions = Object.fromEntries(selectedFlights);
    this.props.setPriceRoundTrip(airOptions);
  };
  render() {
    // console.log("RoundTripFlightResult Status, ", prePerdStatus)
    if (this.state.prePerdStatus) {
      return (
        <LoaderSpiner
          show={this.state.prePerdStatus}
          loadingText="Geting Flights ..."
        />
      );
    }

    console.log("Befor Destarcture State, ", this.state);

    let {
      departureFlights,
      retFlights,
      selectedFlights,
      priceReqStatus,
      prePerdStatus,
      loadingPropsStatus,
      searchStatus,
    } = this.state;

    console.log("Befor Render->Return, ");
    return (
      <React.Fragment>
        <Row>
          {priceReqStatus && (
            <LoaderSpiner
              show={priceReqStatus}
              loadingText="Flight Selecting plaese wait..."
            />
          )}
          <Col md={6}>
            {console.log("Render DepartureFlights, ", departureFlights)}
            {departureFlights &&
              departureFlights.map((flight, dIdx) => {
                console.log("Each Flight: ", flight);

                return (
                  <BookingCardRoundTripOptions
                    traceId={this.state.depBaseInf.traceId}
                    flight={flight}
                    elmKey={`dep-${dIdx}`}
                    getSelectedItem={(item) => {
                      this.setSelectedAir({
                        selectedIdx: item.elmKey,
                        flight: item.flight,
                        key: "dep",
                      });
                    }}
                    preSetItem={this.state.preSelectIdx.departureFlight}
                    currencyType={
                      this.state.depBaseInf &&
                      this.state.depBaseInf.currencyType
                    }
                    key={`d-${dIdx}`}
                    loadingStatus={searchStatus}
                  />
                );
              })}
          </Col>
          <Col md={6}>
            {retFlights &&
              retFlights.map((flight, rIdx) => {
                return (
                  <BookingCardRoundTripOptions
                    traceId={this.state.retBaseInf.traceId}
                    flight={flight}
                    elmKey={`ret-${rIdx}`}
                    getSelectedItem={(item) => {
                      this.setSelectedAir({
                        selectedIdx: item.elmKey,
                        flight: item.flight,
                        key: "ret",
                      });
                    }}
                    preSetItem={this.state.preSelectIdx.retFlight}
                    currencyType={
                      this.state.retBaseInf &&
                      this.state.retBaseInf.currencyType
                    }
                    key={`r-${rIdx}`}
                    loadingStatus={searchStatus}
                  />
                );
              })}
          </Col>
          <Col md={12}>
            <StickyCard
              traceId={this.state.depBaseInf.traceId}
              currencyType={this.state.depBaseInf.currencyType}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

RoundTripFlightResult.prototypes = {
  searchQuery: PropTypes.object.isRequired,
  selectedRoundAir: PropTypes.object.isRequired,
  setSelectedPrcingDetailsRoundTrip: PropTypes.func.isRequired,
  setPriceRoundTrip: PropTypes.func.isRequired,
  departureFlights: PropTypes.object.isRequired,
  returnFlights: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  searchQuery: state.searchQuery.sQuery.searchQuery,
  airPorts: state.airSearch.airPortsList,
  rndPricingDetail: state.airPriceDetails.rndDetailsPrice,
  selectedRoundAir: state.airPrice.selectedRoundTripAir,
  departureResStatus: state.airSearch.departureResStatus,
  returnResStatus: state.airSearch.returnResStatus,
});

export default connect(mapStateToProps, {
  setSelectedPrcingDetailsRoundTrip,
  setPriceRoundTrip,
  getPriceSearchAction,
})(RoundTripFlightResult);
