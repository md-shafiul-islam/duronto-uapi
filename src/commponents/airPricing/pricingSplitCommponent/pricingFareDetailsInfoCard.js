import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import PricingFareTypeCard from "./pricingFareTypeCard";
import PricingFlyDetails from "./pricingFlyDetails";

const PricingFareDetailsInfoCard = (params) => {
  
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <PricingFlyDetails />
          </Col>

          {/*** Pricing Details Mapp */}
          <Col md={9} >
            <div className="pricing-items">
              {params.returnOption[0].airPricingSolution &&
                params.returnOption[0].airPricingSolution.map(
                  (retnItem, rtIdx) => {
                    return (
                      <Col md={5} key={`pcgc-${rtIdx}`} className="hrz-item">
                        <PricingFareTypeCard airSolution={retnItem} />
                      </Col>
                    );
                  }
                )}
              </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PricingFareDetailsInfoCard;
