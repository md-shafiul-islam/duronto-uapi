import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAirLines, getAirports } from "../../../actions/airSearchAction";

import { Redirect } from "react-router-dom";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import AirPricringItinerayTitle from "../airPricringItinerayTitle";
import PricingLayover from "../pricingLayover";
import PriceItineraryCard from "../PriceItineraryCard";
import {
  helperGetCurrency,
  helperGetPriceNumber,
  helperGetTotalFlyTimeBetweenTwoDate,
} from "../../../actions/helperAction";
import PricingBaggageCard from "../pricingBaggageCard";

import FareSummaryUsingPriceList from "../pricingSplitCommponent/FareSummaryUsingPriceList";

let prevDate = null;

class RndTripPriceingDetailsPage extends Component {
  state = {
    travelerInf: {},
    loadStatus: true,
    displayMsg: false,
    retPricingDetails: null,
    depPricingDetails: null,
    farePriceSummery: null,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("RND Trip Pricing Details Page: After Props ", nextProps);

    this.initStateUsingProps();
  }
  componentDidMount() {
    console.log("RND Trip Pricing Details Page: Props ", this.props);
    this.initStateUsingProps();
  }

  prePopulateAirPricDetailsEachOne = (priceInfDtls) => {
    if (priceInfDtls !== undefined) {
      let { airPriceOpt, segment } = priceInfDtls;

      const priceDetails = {
        baggages: [],
        changePenalties: [],
        cancelPenalties: [],
        brand: {},
        cabinClass: "",
        segments: segment,
        stops: 0,
        stopsLocs: null,
        totalFlyTime: null,
        lastDestination: null,
        fstOrigin: null,
        fstDepTime: null,
        prices: [],
      };

      let baggageLists = [];
      let changePenaltyList = [];
      let cancelPenaltyList = [];
      let lBrand = null;
      let cabinClass = null;

      if (airPriceOpt !== undefined) {
        let slAirPriceInf = airPriceOpt.airPricingInfo[0].fareInfo[0];

        lBrand = lBrand === null ? slAirPriceInf.brand : lBrand;

        console.log("airPriceOpt, ", airPriceOpt);

        airPriceOpt.airPricingInfo.map((airPriceInf, idx) => {
          let { code } = airPriceInf.passengerType[0];

          cancelPenaltyList.push({
            key: code,
            value: airPriceInf.cancelPenalty,
          });
          changePenaltyList.push({
            key: code,
            value: airPriceInf.changePenalty,
          });
          baggageLists.push({
            key: code,
            value: airPriceInf.baggageAllowances,
          });

          if (cabinClass === null) {
            cabinClass = airPriceInf.bookingInfo[0].cabinClass;
          }

          priceDetails.prices.push({
            key: code,
            basePrice: airPriceInf.equivalentBasePrice,
            taxes: airPriceInf.taxes,
            totalPrice: airPriceInf.totalPrice,
          });
        });
      }

      /*priceDetails.opBasePrice = airPriceOpt.equivalentBasePrice;
      priceDetails.opTotalPrice = airPriceOpt.totalPrice;
      priceDetails.opTaxesAmount = airPriceOpt.taxes;*/

      priceDetails.baggages = baggageLists;
      priceDetails.changePenalties = changePenaltyList;
      priceDetails.cancelPenalties = cancelPenaltyList;
      priceDetails.brand = lBrand;
      priceDetails.cabinClass = cabinClass;

      let stops = 0;
      let stopLoc = [];
      let totalTime = 0;
      let lastDestination = "";
      let fstOrigin = null;
      let fstDepTime = null;

      if (segment !== undefined) {
        segment.map((segment, segIdx) => {
          if (segIdx === 0) {
            fstOrigin = segment.origin;
            fstDepTime = segment.departureTime;
          }
          if (segIdx > 0) {
            stops++;
            stopLoc.push(segment.origin);
          }
          totalTime = totalTime + segment.flightTime;
          lastDestination = segment.destination;
        });
      }

      priceDetails.stops = stops;
      priceDetails.stopsLocs = stopLoc;
      priceDetails.totalFlyTime = totalTime;

      priceDetails.lastDestination = lastDestination;
      priceDetails.fstOrigin = fstOrigin;
      priceDetails.fstDepTime = fstDepTime;

      console.log("Return Befor Fly Price Info Details: ", priceDetails);
      return priceDetails;
    }
  };

  initStateUsingProps = () => {
    let travelerQty = this.initQuery();

    console.log(
      "this.props.rndPricingDetail.detureItem Befor, ",
      this.props.rndPricingDetail.detureItem
    );

    if (
      this.props.rndPricingDetail.detureItem !== undefined &&
      this.props.rndPricingDetail.returnItem !== undefined
    ) {
      let deptuerPriceDetails = this.prePopulateAirPricDetailsEachOne(
        this.props.rndPricingDetail.detureItem
      );
      let returnPriceDetails = this.prePopulateAirPricDetailsEachOne(
        this.props.rndPricingDetail.returnItem
      );

      console.log(
        "this.props.rndPricingDetail.detureItem ",
        this.props.rndPricingDetail.detureItem
      );

      if (
        returnPriceDetails !== undefined &&
        deptuerPriceDetails !== undefined
      ) {
        let itineraryPrices = [];
        itineraryPrices.push({
          key: "Depture: ",
          details: deptuerPriceDetails,
        });
        itineraryPrices.push({ key: "Return: ", details: returnPriceDetails });

        console.log("Air Itinerary, ", itineraryPrices);
        console.log("Air Traveler, ", travelerQty);

        const farePriceSummery = [];

        travelerQty &&
          travelerQty.map((traveler, tIdx) => {
            let combPassengerPrice = {
              key: traveler.key,
              basePrice: 0,
              tax: 0,
              totalPrice: 0,
              passengerQty: traveler.value,
              currency: "",
            };
            let basePrice = 0;
            let taxes = 0;
            let totalPrice = 0;
            let currency = "";

            console.log("Traveler Qty Obj: ", traveler);

            itineraryPrices &&
              itineraryPrices.map((item, itnIx) => {
                item &&
                  item.details &&
                  item.details.prices &&
                  item.details.prices.map((pricePass, pIdx) => {
                    if (traveler.key === pricePass.key) {
                      basePrice += helperGetPriceNumber(pricePass.basePrice);
                      taxes += helperGetPriceNumber(pricePass.taxes);
                      totalPrice += helperGetPriceNumber(pricePass.totalPrice);
                      currency = helperGetCurrency(pricePass.basePrice);

                      //console.log("Set Summery Obj pricePass.basePrice, Each One, ", pricePass.basePrice);
                    }
                  });
              });

            combPassengerPrice.basePrice = basePrice;
            combPassengerPrice.totalPrice = totalPrice;
            combPassengerPrice.tax = taxes;
            combPassengerPrice.currency = currency;

            farePriceSummery.push(combPassengerPrice);
            combPassengerPrice = null;
          });

        this.setState({
          retPricingDetails: returnPriceDetails,
          depPricingDetails: deptuerPriceDetails,
          travelerInf: travelerQty,
          farePriceSummery: farePriceSummery,
          loadStatus: false,
        });
      }
    }
  };

  initQuery = () => {
    if (this.props.searchQury !== undefined) {
      let { passDetails, traveler } = this.props.searchQury;

      let travelerQty = [];
      if (traveler !== undefined) {
        if (traveler.ADT !== undefined) {
          travelerQty.push({ key: "ADT", value: traveler.ADT.value });
        }

        if (traveler.CNN !== undefined) {
          travelerQty.push({ key: "CNN", value: traveler.CNN.value });
        }

        if (traveler.INF !== undefined) {
          travelerQty.push({ key: "INF", value: traveler.INF.value });
        }
      }

      return travelerQty;
    }
  };

  render() {
    if (this.state.loadStatus) {
      return <Spinner animation="grow" />;
    }

    if (this.state.redirecStatus) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        {console.log("this.state, ", this.state)}
        {console.log("this.props, ", this.props)}
        <Row>
          <Col md={8}>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Title>
                    <AirPricringItinerayTitle
                      title="Depture"
                      changePenalty={
                        this.state.depPricingDetails.changePenalties
                      }
                      cancelPenalty={
                        this.state.depPricingDetails.cancelPenalties
                      }
                      stops={this.state.depPricingDetails.stops}
                      stoplocs={this.state.depPricingDetails.stopsLocs}
                      totalFlyTime={this.state.depPricingDetails.totalFlyTime}
                      cabinClass={this.state.depPricingDetails.cabClass}
                      origin={this.state.depPricingDetails.fstOrigin}
                      destination={this.state.depPricingDetails.lastDestination}
                      departureTime={this.state.depPricingDetails.fstDepTime}
                    />
                  </Card.Title>
                  <Card.Body>
                    {this.state.depPricingDetails &&
                      this.state.depPricingDetails.segments.map(
                        (segment, sIdx) => {
                          let deff = null;
                          if (sIdx > 0) {
                            deff = helperGetTotalFlyTimeBetweenTwoDate(
                              prevDate,
                              segment.departureTime
                            );
                          }

                          prevDate = segment.arrivalTime;
                          return (
                            <React.Fragment>
                              {sIdx > 0 ? (
                                <React.Fragment>
                                  <PricingLayover
                                    timeDiff={deff}
                                    layoverOrigin={segment.origin}
                                  />
                                  <Row className="mgbt20"></Row>
                                </React.Fragment>
                              ) : (
                                ""
                              )}
                              <PriceItineraryCard
                                segment={segment}
                                lBrand={this.state.depPricingDetails.brand}
                              />

                              <Row className="baggage-area">
                                <PricingBaggageCard
                                  baggageAllowance={
                                    this.state.depPricingDetails.baggages
                                  }
                                />
                              </Row>
                            </React.Fragment>
                          );
                        }
                      )}
                  </Card.Body>
                </Card>
              </Col>

              <Col md={12}>
                <Card>
                  <Card.Title>
                    <AirPricringItinerayTitle
                      title="Return"
                      changePenalty={
                        this.state.retPricingDetails.changePenalties
                      }
                      cancelPenalty={
                        this.state.retPricingDetails.cancelPenalties
                      }
                      stops={this.state.retPricingDetails.stops}
                      stoplocs={this.state.retPricingDetails.stopsLocs}
                      totalFlyTime={this.state.retPricingDetails.totalFlyTime}
                      cabinClass={this.state.retPricingDetails.cabClass}
                      origin={this.state.retPricingDetails.fstOrigin}
                      destination={this.state.retPricingDetails.lastDestination}
                      departureTime={this.state.retPricingDetails.fstDepTime}
                    />
                  </Card.Title>
                  <Card.Body>
                    {this.state.retPricingDetails &&
                      this.state.retPricingDetails.segments.map(
                        (segment, sIdx) => {
                          let deff = null;
                          if (sIdx > 0) {
                            deff = helperGetTotalFlyTimeBetweenTwoDate(
                              prevDate,
                              segment.departureTime
                            );
                          }

                          prevDate = segment.arrivalTime;
                          return (
                            <React.Fragment>
                              {sIdx > 0 ? (
                                <React.Fragment>
                                  <PricingLayover
                                    timeDiff={deff}
                                    layoverOrigin={segment.origin}
                                  />
                                  <Row className="mgbt20"></Row>
                                </React.Fragment>
                              ) : (
                                ""
                              )}
                              <PriceItineraryCard
                                segment={segment}
                                lBrand={this.state.retPricingDetails.brand}
                              />

                              <Row className="baggage-area">
                                <PricingBaggageCard
                                  baggageAllowance={
                                    this.state.retPricingDetails.baggages
                                  }
                                />
                              </Row>
                            </React.Fragment>
                          );
                        }
                      )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <FareSummaryUsingPriceList
              airPriceList={this.state.farePriceSummery}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

RndTripPriceingDetailsPage.prototypes = {
  getAirLines: PropTypes.func.isRequired,
  queryType: PropTypes.object.isRequired,
  getAirports: PropTypes.func.isRequired,
  airLines: PropTypes.object.isRequired,
  airPorts: PropTypes.object.isRequired,
  rndPricingDetail: PropTypes.object.isRequired,
  searchQury: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  airLines: state.airSearch.airLinesList,
  airPorts: state.airSearch.airPortsList,
  rndPricingDetail: state.airPriceDetails.rndDetailsPrice,
  searchQury: state.searchQuery.sQuery.searchQuery,
  queryType: state.searchQuery.sQuery.type,
});
export default connect(mapStateToProps, { getAirLines, getAirports })(
  RndTripPriceingDetailsPage
);
