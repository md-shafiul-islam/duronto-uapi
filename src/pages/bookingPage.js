import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FareSummaryUsingPriceList from "../commponents/airPricing/pricingSplitCommponent/FareSummaryUsingPriceList";
import BookingFlightSummary from "../commponents/booking/bookingFlightSummary";
import BookingTravellerDetailsCard from "../commponents/booking/bookingTravellerDetailsCard";
import LoadingComp from "../commponents/helper/LoadingComp";
import { localDataStore } from "../commponents/helper/localDataStore";

class BookingPage extends Component {
  state = {
    deptuerPriceDetails: {},
    returnPriceDetails: {},
    loadStatus: false,
    farePriceSummery: {},
  };

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
                    <BookingTravellerDetailsCard travelers={farePriceSummery&&farePriceSummery.eachPrices} />
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
