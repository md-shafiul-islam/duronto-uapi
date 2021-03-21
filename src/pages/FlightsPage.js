import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AirSearchForm from '../commponents/searchCompt/AirSearchForm'

class FlightsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <AirSearchForm />
                </Container>
            </React.Fragment>
        )
    }
}

export default FlightsPage;
