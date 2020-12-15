import { el } from "date-fns/locale";
import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import PricingFareTypeCard from "./pricingFareTypeCard";
import PricingFlyDetails from "./pricingFlyDetails";

class PricingDetailsOptionCard extends Component {
  state = {
    deptSelectedAir: { segment: new Array(), priceSlution: {} },
    retSelectedAir: { segment: new Array(), priceSlution: {} },
    redirecStatus: false,
    selItElm:-1,
    selectedPriceOption:{},
  };
  

  setSelectedItemIdx = (iDx, airSolution)=>{
    
    if(iDx > -1){
     
      this.setState({selItElm:iDx, selectedPriceOption:airSolution});

      this.props.setFlightOption(airSolution);
    }
  }

 
  render() {
    
    return (
      <Card>
        <Card.Body>
          <Row>
            <Col md={3}>
              <PricingFlyDetails
                airSegment={this.props.airSegment}
                airPorts={this.props.airPorts}
                airLines={this.props.airLines}
              />
            </Col>

            {/*** Pricing Details Mapp */}
            <Col md={9}>
              <div className="pricing-items">
                {this.props.airSolutions &&
                  this.props.airSolutions.map((depItem, dIdx) => {
                    return (
                      <Col md={5} key={`pcgc-dep-${dIdx}`} className="hrz-item">
                        <PricingFareTypeCard
                          airSolution={depItem}
                          elemId={this.state.selItElm}
                          cElmId={dIdx}
                          setImeIdx={(iDx)=>{
                            this.setSelectedItemIdx(iDx, depItem);
                          }}
                        />
                      </Col>
                    );
                  })}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default PricingDetailsOptionCard;
