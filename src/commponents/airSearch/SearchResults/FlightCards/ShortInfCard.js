import React from "react";
import { Col, Row } from "react-bootstrap";

const ShortInfCard = (params) => {
  return (
    <Col md={12}>
      <Row className="info-box bg-info">
        <Col md={12} className="item-inf-title">
          <div className="short-title-area">
            {!params.oneWay && (
              <React.Fragment>
                <span className="flight-name">
                  US Air | <span className="flight-no">SG-154</span>
                </span>
              </React.Fragment>
            )}
          </div>
        </Col>

        <Col md={12} className="item-content">
          <Row className="info-box-content">
            {params.oneWay === true ? (
              <React.Fragment>
                <Col md={3} className="info-box-icon">
                  <i className="far fa-bookmark" />
                  <span className="flight-name">US Air</span>
                  <span className="flight-no">SG-154</span>
                </Col>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col md={1} className="provider-icon">
                  <p>
                    <i className="far fa-bookmark" />
                  </p>
                </Col>
              </React.Fragment>
            )}

            <Col md={2} className="info-box-text time">
              <div className="time">01:45</div>
              <p className="air-city">Mumbai</p>
            </Col>
            <Col md={3} className=" duration">
              <div className="air-time">
                <b>1</b>hr<b>15</b>mins
              </div>
              <p className="fly-type">Non-Stop</p>
            </Col>
            <Col md={2} className="info-box-text time">
              <div className="time">01:45</div>
              <p className="air-city">Dhili</p>
            </Col>
            <Col md={4} className="info-box-number air-price">
              <p>$45645</p>
            </Col>
          </Row>
        </Col>

        {/* /.info-box-content */}
      </Row>
      {/* /.info-box */}
    </Col>
  );
};

export default ShortInfCard;
