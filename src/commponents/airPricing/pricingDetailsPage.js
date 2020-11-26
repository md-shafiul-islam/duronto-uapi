import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import OneWayPriceing from './oneWayPriceing';


class PricingDetailsPage extends Component {
    render() {
        return (
            <React.Fragment>

                <Row>
                    <Col md={12}>
                        <OneWayPriceing />
                    </Col>
                    
                </Row>

            </React.Fragment>
        )
    }
}

export default PricingDetailsPage;
