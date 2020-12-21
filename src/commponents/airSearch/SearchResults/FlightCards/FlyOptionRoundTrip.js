import React, { Component } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setSelectedPrcingDetailsRoundTrip } from '../../../../actions/priceAction';
import BookingCardRoundTripOptions from "./BookingCardRoundTripOptions";
import StickyCard from "./StickyCard";

 class FlyOptionRoundTrip extends Component{
  
  state = {
    priceRedirect:false,
  }

  setSelectedAirPriceOptions = (airPricOptions)=>{

    const airOptions = Object.fromEntries(airPricOptions);

    this.props.setSelectedPrcingDetailsRoundTrip(airOptions);
    this.setState({priceRedirect:true});
  }

  render (){

    if(this.state.priceRedirect){
      return <Redirect to="/air/pricing" />;
    }
    return (
      <React.Fragment>
        <Row>
          <Col md={6}>
            {this.props.availAbleFlights &&
              this.props.availAbleFlights.map((flyItem, fIdx) => {
                if (flyItem.airLeg.group === this.props.airLegs[0].group) {
                  return (
                    <React.Fragment>
                      <BookingCardRoundTripOptions
                        preSelecteItem={this.props.preSelectFly.deptureFly}
                        flyItem={flyItem}
                        elmId={fIdx}
                        getSelectedItem={(flyOption, opIdx, elmId) => {
                          this.props.getDepSelectedFly(flyOption, opIdx, elmId);
                        }}
                      />
                    </React.Fragment>
                  );
                }
              })}
          </Col>
          <Col md={6}>
            {this.props.availAbleFlights &&
              this.props.availAbleFlights.map((flyItem, fIdx) => {
                if (flyItem.airLeg.group === this.props.airLegs[1].group) {
                  return (
                    <React.Fragment>
                      <BookingCardRoundTripOptions
                        preSelecteItem={this.props.preSelectFly.returnFly}
                        flyItem={flyItem}
                        elmId={fIdx}
                        getSelectedItem={(flyOption, opIdx, elmId) => {
                          this.props.getRetSelectedFly(flyOption, opIdx, elmId);
                        }}
                      />
                    </React.Fragment>
                  );
                }
              })}
          </Col>
          <Col md={12}>
            <StickyCard 
              flyOption={this.props.selectedOption} 
         
              getSelectedPricingOptions={(slcOptions)=>{
                this.setSelectedAirPriceOptions(slcOptions);
              }}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
};

FlyOptionRoundTrip.prototypes = {
  setSelectedPrcingDetailsRoundTrip: PropTypes.func.isRequired,
};
export default connect(null, {setSelectedPrcingDetailsRoundTrip})(FlyOptionRoundTrip);
