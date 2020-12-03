import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAirLines, getAirports } from "../actions/airSearchAction";

class HeaderContent extends Component {
  componentDidMount() {
    this.props.getAirLines();
    this.props.getAirports();
  }

  render() {
    return <div></div>;
  }
}

HeaderContent.prototypes = {
  getAirLines: PropTypes.func.isRequired,
  getAirports: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  airLines: state.airSearch.airLinesList,
  airPorts: state.airSearch.airPortsList,
});

export default connect(mapStateToProps, { getAirLines, getAirports })(
  HeaderContent
);
