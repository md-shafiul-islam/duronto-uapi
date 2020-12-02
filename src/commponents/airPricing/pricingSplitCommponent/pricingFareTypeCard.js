import { getByTitle } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import PricingFareTypeDetails from "./pricingFareTypeDetails";
import PricingFareTypeTitile from "./pricingFareTypeTitile";

const PricingFareTypeCard = (params) => {
  const [brand, setBrand] = useState({});
  const [detailsText, setDetailsText] = useState(new Array());

  useEffect(() => {
    if (params.airSolution !== undefined) {
      let lcBrand = null;

      params.airSolution.airPricingInfo &&
        params.airSolution.airPricingInfo.map((priceItem, prcIdx) => {
          if (priceItem.fareInfo !== undefined) {
            if (priceItem.fareInfo.length > 0 && lcBrand === null) {
              priceItem.fareInfo.map((fareItem, fIdx) => {
                if (fareItem.brand !== undefined) {
                  if (fareItem.brand !== null) {
                    lcBrand = fareItem.brand;
                  }
                }
              });
            }
          }
        });

      setBrand(lcBrand);

      initBrandTextTitle(lcBrand);
    }
  }, []);

  const initBrandTextTitle = (lcBrand) => {
    if (lcBrand !== undefined) {
      let { text, title } = lcBrand;
      let slTitle = "";
      let sltext = "";

      if (text !== undefined && title !== undefined) {
        title.map((tItem, tIdx) => {
          if (tItem.type === "External") {
            slTitle = tItem.value;
          }
        });

        text.map((textItem, txtIdx) => {
          if (textItem.type === "MarketingConsumer") {
            sltext = textItem.value;
          }
        });
      }

      if (slTitle !== "" && sltext !== "") {
        sltext = sltext.split("•");

        if (sltext[0].toLowerCase().indexOf(slTitle.toLowerCase())) {
          sltext.shift();
        }

        setDetailsText(sltext);
      }
    }
  };

  const getBrandName = (pBrand) => {
    if (pBrand !== undefined) {
      return pBrand.name;
    }
  };

  const getBrandText = (lcBrand) => {
    return lcBrand.text;
  };

  const getBrandTitle = (pB) => {
    return pB.title;
  };

  console.log("Card Item Params: ", params);
  return (
    <Card className="pricing-card">
      <Card.Title className="price-details-inf-title">
        <PricingFareTypeTitile
          brandName={getBrandName(brand)}
          totalPrice={params.airSolution.totalPrice}
        />
      </Card.Title>

      <Card.Body className="price-details-inf-card">
        <ul className="price-details-inf">
          {detailsText &&
            detailsText.map((item, tIdx) => {

              

              return (
                <li className="rnd-price-fare-inf">
                  {detailsText.length-1 === tIdx ? <i className="fas fa-asterisk icon-color"></i>: <i className="far fa-check-circle icon-color"></i>}&nbsp;{item}
                </li>
              );
            })}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default PricingFareTypeCard;
