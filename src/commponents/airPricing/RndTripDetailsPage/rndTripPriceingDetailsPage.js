import React, { Component } from 'react'

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAirLines, getAirports } from '../../../actions/airSearchAction';

class RndTripPriceingDetailsPage extends Component {

    componentDidMount(){
        
    }
    render() {
        return (
            <div>
                Data Is loading... 
            </div>
        )
    }
}

RndTripPriceingDetailsPage.prototypes = {
    getAirLines: PropTypes.func.isRequired,
    getAirports: PropTypes.func.isRequired,
    airLines: PropTypes.object.isRequired,
    airPorts: PropTypes.object.isRequired,    
    rndPricingDetail:PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    errors: state.errors,
    airLines: state.airSearch.airLinesList,
    airPorts: state.airSearch.airPortsList,
    rndPricingDetail:state.airPriceDetails.rndDetailsPrice,
  });
export default connect(mapStateToProps, {getAirLines, getAirports})(RndTripPriceingDetailsPage);