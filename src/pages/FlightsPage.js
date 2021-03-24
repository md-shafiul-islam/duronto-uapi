import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import HeaderContent from '../commponents/headerContent'
import AirSearchForm from '../commponents/searchCompt/AirSearchForm'

class FlightsPage extends Component {
    render() {
        return (
            
            <React.Fragment>
                <HeaderContent />
                <Container className="com-sticky">
                    <div className="loaderPlaceholder"></div>
                    <AirSearchForm />
                </Container>
            </React.Fragment>
            
        )
    }
}

export default FlightsPage;
