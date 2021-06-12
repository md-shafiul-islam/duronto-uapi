import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FareSummaryUsingPriceList from "../commponents/airPricing/pricingSplitCommponent/FareSummaryUsingPriceList";
import BookingFlightSummary from "../commponents/booking/bookingFlightSummary";
import BookingTravellerDetailsCard from "../commponents/booking/bookingTravellerDetailsCard";
import { preSetBookingOption } from "../commponents/helper/esFnc";
import LoadingComp from "../commponents/helper/LoadingComp";
import { localDataStore } from "../commponents/helper/localDataStore";

class BookingPage extends Component {
  state = {
    deptuerPriceDetails: {},
    returnPriceDetails: {},
    loadStatus: false,
    farePriceSummery: {},
  };

  /* Start Deploy *********/
  componentDidMount() {
    console.log("Booking Page ...");

    this.prePerdPriceToBooking();
  }

  prePerdPriceToBooking = () => {
    let rndPriceOptions = localDataStore.getPreSetRndPriceDetails();

    // console.log("rndPriceOptions Local Store: ", rndPriceOptions);
    if (rndPriceOptions) {
      //   this.setState({ roundPriceOptions: rndPriceOptions, loadStatus: true });

      let {
        deptuerPriceDetails,
        returnPriceDetails,
        farePriceSummery,
      } = rndPriceOptions;

      this.setState({
        deptuerPriceDetails,
        returnPriceDetails,
        farePriceSummery,
        loadStatus: true,
      });
    }
  };

  bookingAction = (passengers) => {
    console.log("Booking Page Passengers, ", passengers);

    const selectedTndTrip = localDataStore.getPriceRoundTripFlights();

    console.log("Booking Page selectedTndTrip, ", selectedTndTrip);
    
    const bookSolution = [];

    let deptureOpt = preSetBookingOption(selectedTndTrip.detureItem);

    let retOpt = preSetBookingOption(selectedTndTrip.returnItem);

    if(deptureOpt){
      bookSolution.push(deptureOpt);
    }
    
    if(retOpt){
      bookSolution.push(retOpt);

    }

    const bookingQuery = {
      traceId: "b91418dc-4144-4880-9f13-b906588dece6",
      actionDateTime: "2021-02-26T23:30:00.000+06:00",
      bookingTravelerReq: passengers,
      bookAirSolution: bookSolution,
    };

    console.log("Booking Query, ", JSON.stringify(bookingQuery, null, 2));
  };
  render() {
    let {
      deptuerPriceDetails,
      returnPriceDetails,
      farePriceSummery,
      loadStatus,
    } = this.state;

    if (!loadStatus) {
      return <LoadingComp />;
    }

    console.log(
      "rndPriceOptions Local Store: farePriceSummery, ",
      farePriceSummery
    );

    return (
      <React.Fragment>
        <Row>
          <Col md={9}>
            <Row>
              <Col md={12}>
                <BookingFlightSummary
                  deptuerPriceDetails={deptuerPriceDetails}
                  returnPriceDetails={returnPriceDetails}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <BookingTravellerDetailsCard
                  travelers={farePriceSummery && farePriceSummery.eachPrices}
                  getTravelersAction={this.bookingAction}
                />
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <FareSummaryUsingPriceList airPriceList={farePriceSummery} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default BookingPage;
