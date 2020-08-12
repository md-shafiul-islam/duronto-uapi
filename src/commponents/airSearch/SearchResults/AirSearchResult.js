import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ShortInfCard from "./FlightCards/ShortInfCard";
import SelectedAirDetails from "./SelectedAirDetails";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getSearchResult } from "../../../actions/airSearchAction";

class AirSearchResult extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={3}></Col>

          <Col md={9}>
            <div className="content">
              <Row>
                <div className="col-lg-6">
                  {/** short card item Strat */}
                  <ShortInfCard oneWay={false} />
                  {/** short card item End */}
                </div>
                {/* /.col-md-6 */}

                <div className="col-lg-6">
                  <ShortInfCard oneWay={false} />
                </div>
                {/* /.col-md-6 */}
              </Row>
              {/* /.row */}
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <SelectedAirDetails />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

AirSearchResult.prototypes = {
  getSearchResult: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  airSearchResponse: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  airSearchResponse: state.airSearch,
});

export default connect(mapStateToProps, { getSearchResult })(AirSearchResult);
