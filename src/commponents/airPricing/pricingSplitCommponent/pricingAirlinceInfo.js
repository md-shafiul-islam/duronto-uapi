import React from 'react'
import { Col, Row } from 'react-bootstrap';

const PricingAirlinceInfo = (params) =>{
    return (
        <Row>
            <Col md={3} className="pricing-icon">Icon</Col>
            <Col md={9} className="pricing-air-inf">info inline</Col>
        </Row>
    )
}

export default PricingAirlinceInfo;
