import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAirLines, getAirports, airPortsArray } from "../actions/airSearchAction";

class HeaderContent extends Component {
  componentDidMount() {
    this.props.getAirLines();
    this.props.getAirports();
    this.props.airPortsArray();
  }

  render() {
    return <div></div>;
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
