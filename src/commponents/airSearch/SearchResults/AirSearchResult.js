import React, { Component } from "react";
import { Col } from "react-bootstrap";
import ShortInfCard from "./FlightCards/ShortInfCard";
import SelectedAirDetails from "./SelectedAirDetails";

class AirSearchResult extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container">{/* /.row */}</div>

            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <div className="content">
            <div className="container">
              <div className="row">
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
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content */}
        </div>

        <div>
          <SelectedAirDetails />
        </div>
      </React.Fragment>
    );
  }
}

export default AirSearchResult;
