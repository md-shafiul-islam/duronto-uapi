import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAirLines, getAirports, airPortsArray } from "../actions/airSearchAction";
import TopNavBar from "./header/nav/topNavBar";
import { Container } from "react-bootstrap";
import StickyNav from "./header/nav/stickyNav";

class HeaderContent extends Component {
  componentDidMount() {
    this.props.getAirLines();
    this.props.getAirports();
    this.props.airPortsArray();

  }


  render() {
    return (
      <React.Fragment>
         <Container>        
          <TopNavBar />          
         </Container>
         
        
      </React.Fragment>
    );
  }
}

HeaderContent.prototypes = {
  getAirLines: PropTypes.func.isRequired,
  getAirports: PropTypes.func.isRequired,
  airPortsArray:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  airLines: state.airSearch.airLinesList,
  airPorts: state.airSearch.airPortsList,
  airPortsArr:state.airSearch.airPortsArr,
});

export default connect(mapStateToProps, { getAirLines, getAirports, airPortsArray})(
  HeaderContent
);
