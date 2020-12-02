import { tr } from 'date-fns/locale';
import React, { Component } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import BookingCardRoundTripOptions from "./BookingCardRoundTripOptions";
import StickyCard from "./StickyCard";

 class FlyOptionRoundTrip extends Component{
  
  state = {
    priceRedirect:false,
  }

  setSelectedAirPriceOptions = (returnOption, deptureOption)=>{

    //this.setState({priceRedirect:true});
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
              getSelectedOptionsPric={(resReturn, resDepReturn)=>{
                this.setSelectedAirPriceOptions(resReturn, resDepReturn);
              }
            }/>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
};

export default FlyOptionRoundTrip;
