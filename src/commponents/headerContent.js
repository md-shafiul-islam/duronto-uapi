import React, { Component } from 'react';

import { PropTypes } from "prop-types";
import { connect } from 'react-redux';
import { getAirLines } from '../actions/airSearchAction';


class HeaderContent extends Component {

    componentDidMount(){
      this.props.getAirLines();
      }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

HeaderContent.prototypes = {
    getAirLines: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    errors: state.errors,
    airLines: state.airSearch.airLinesList,
  });

export default connect(mapStateToProps, { getAirLines })(HeaderContent);
