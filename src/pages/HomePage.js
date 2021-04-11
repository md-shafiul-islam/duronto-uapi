import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import OffersCard from '../commponents/carousel/offersCard'
import HeaderContent from '../commponents/headerContent'

 class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <HeaderContent />
                <Container>
                    <OffersCard />
                </Container>
            </React.Fragment>
        )
    }
}

export default HomePage;
