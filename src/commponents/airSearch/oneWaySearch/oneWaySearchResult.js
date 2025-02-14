import React, { Component } from "react";
import HelperLoader from "../../helper/helperLoader";
import OneWayFlightCard from "../SearchResults/GenericCard/oneWayFlightCard";

class OneWaySearchResult extends Component {
  state = {
    result: {},
    flights: [],
    prePerdStatus:false,
  };

  componentDidMount() {
    this.getFlights();
    // console.log("OneWaySearchResult componentDidMount, ", this.props);

    if (this.props.result !== undefined && this.props.result !== null) {
      this.setState({ result: this.props.result });
    }
  }

  getFlights = () => {
    
    let { airPricePoints } = this.props.result;

    const localFlights = [];
    let changePenaltiesList = new Map();
    let cancelPenaltiesList = new Map();

    airPricePoints &&
      airPricePoints.forEach((airPrice, apIdx) => {

        //console.log("Air Price Prosseing, ", airPrice);
        let {
          approximateFees,
          approximateTaxes,
          approximateTotalPrice,
          basePrice,
          taxes,
          totalPrice,
          approximateBasePrice          
        } = airPrice;
        let priceInfos = {
          approximateFees,
          approximateTaxes,
          approximateTotalPrice,
          basePrice,
          taxes,
          totalPrice,
          approximateBasePrice,
        };

        let cancelPenalties = [];
        let changePenalties = [];
        airPrice &&
          airPrice.airPricingInfo &&
          airPrice.airPricingInfo.forEach((pricingInfo, piIdx) => {
            let { cancelPenalty, changePenalty, passengerType, platingCarrier} = pricingInfo;

            cancelPenalties.push({
              key: passengerType[0].code,
              group: apIdx,
              penalty:cancelPenalty,
            });
            changePenalties.push({
              key: passengerType[0].code,
              group: apIdx,
              penalty:changePenalty,
            });

            if (passengerType[0].code === "ADT" && piIdx === 0) {
              //console.log("pricingInfo Each One: ", pricingInfo);
              
              let eachPrices = {eachTotalPrice:pricingInfo && pricingInfo.totalPrice, eachApxBasePrice:pricingInfo && pricingInfo.approximateBasePrice, eachBasePrice:pricingInfo && pricingInfo.basePrice, eachEqBasePrice:pricingInfo && pricingInfo.equivalentBasePrice, eachTotalTax:pricingInfo && pricingInfo.taxes}
              pricingInfo &&
                pricingInfo.flightOptionsList &&
                pricingInfo.flightOptionsList.flightOption &&
                pricingInfo.flightOptionsList.flightOption.forEach(
                  (flightOpt) => {
                    let { origin, destination } = flightOpt;
                    flightOpt &&
                      flightOpt.option &&
                      flightOpt.option.forEach((option) => {
                        localFlights.push({
                          group: apIdx,
                          priceInfos,
                          origin,
                          destination,
                          option,
                          platingCarrier,
                          eachPrices
                        });
                      });
                  }
                );
            }
          });

        cancelPenaltiesList.set(apIdx, cancelPenalties);
        changePenaltiesList.set(apIdx, changePenalties);
      });

    const flights = localFlights.map((flight, idx) => {
      console.log("Flights Prosseing, ", flight);
      let { destination, origin, option, priceInfos, group, platingCarrier, eachPrices} = flight;
      let item = {
        group,
        destination,
        origin,
        option,
        priceInfos,
        cancelPenalties: cancelPenaltiesList.get(group),
        changePenalties: changePenaltiesList.get(group),
        platingCarrier,
        eachPrices
      };

      return item;
    });
    // console.log("Local Flights, ", localFlights);
    //console.log("After Prosses Flights, ", flights);
    // console.log("cancelPenaltiesList, ", cancelPenaltiesList);
    // console.log("changePenaltiesList, ", changePenaltiesList);
    this.setState({ flights: flights, prePerdStatus:true });

  };
  render() {
    let {
      responseMessage,
      flightDetailsList,
      airSegments,
      fareInfos,
      routeList,
      airPricePoints,
      traceId,
      currencyType
    } = this.state.result;

    let {prePerdStatus, flights} = this.state;
    console.log("Status: ", prePerdStatus);
    if(!prePerdStatus){
      return <HelperLoader />
    }

    return (
      <React.Fragment>
        {flights.map((flight, idx) => {
          console.log("Flight OWSR: ", flight);
          let {destination, origin, option,priceInfos, cancelPenalties, changePenalties, platingCarrier, eachPrices} = flight;
          return (
            <React.Fragment key={`owcr-${idx}`}>
              <OneWayFlightCard
                id={idx}
                option={option}
                origin={origin}
                destination={destination}
                approximateBasePrice={priceInfos.approximateBasePrice}
                airPriceInfos={priceInfos}
                cancelPenalty={cancelPenalties}
                changePenalty={changePenalties}
                airSegments={airSegments}
                flightsDetails={flightDetailsList}
                fareInfos={fareInfos}
                traceId={traceId}
                platingCarrier={platingCarrier}
                eachPrices={eachPrices}
              />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
    
  }
}

export default OneWaySearchResult;
