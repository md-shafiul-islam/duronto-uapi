import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AutoSuggestionInptTextField from "../commponents/autosuggestion/autoSuggestionInptTextField";
import BlogHomePageCard from "../commponents/blogComp/blogHomePageCard";
import OffersCard from "../commponents/carousel/offersCard";
import HeaderContent from "../commponents/headerContent";
import AirSearchForm from "../commponents/searchCompt/AirSearchForm";

class FlightsPage extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContent />
        <Container className="com-sticky">
          <Row>
            <Col md={12}>
              <div className="loaderPlaceholder"></div>
              <AirSearchForm />
            </Col>
          </Row>

          <Row className="mt-50">
            <Col md={12} className="mp-0">
              <OffersCard />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <BlogHomePageCard />
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <AutoSuggestionInptTextField name="from" label="From" change={(text)=>{
                console.log("Autosuggestion Selected One ..., ", text);
              }} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default FlightsPage;
