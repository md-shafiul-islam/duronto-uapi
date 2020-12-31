import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { helperIsNumberString } from "../../actions/helperAction";
import { GET_PASSENGER } from "../../actions/types";

/**
 * 
 * airPriceList
 * airSolution.airPricingInfo this Arra As airPriceList param
 */
/**
 * travelerQuantity All Traveler Info
 * airPriceList each one Price info given pricing solution Or Price Info as Array
 * @param {airPriceList, airTotalBasePrice, airTotalFlyPrice, airTotalTaxPrice, travelerQuantity} params 
 */
const FareSummary = (params) => {

  console.log("Fare Summary Params: ", params);


  const [priceStstus, setPriceStstus] = useState(false);
  const [taxStatus, setTaxStatus] = useState(false);
  const [taxItems, setTaxItems] = useState({
    totalTaxAmount: 0.0,
    details: new Array(),
  });
  const [priceItems, setPriceItems] = useState({
    totalPriceAmount: 0.0,
    details: new Array(),
  });
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    let travelerQuantity = params.travelerQuantity;

    console.log("travelerQuantity: ", travelerQuantity);
    
    if (params.airPriceList !== undefined) {
     
      let allTax = new Array();
      let allPrice = new Array();
      let totalTaxNAmnt = 0.0;
      let totalPriceNAmnt = 0.0;

      params.airPriceList.map((priceItem, idx) => {
       
        let qty = 1;
        travelerQuantity.map((pQty, pQiDx) => {
          if (pQty.key === priceItem.passengerType[0].code) {
            qty = pQty.value;
          }
        });

        
        allTax.push({
          key: priceItem.passengerType[0].code,
          value: priceItem.taxes,
          pQty: qty,
          amount: Number(
            getMultyplayByPassenger(getAmount(priceItem.taxes), qty)
          ),
        });

        totalTaxNAmnt += Number(
          getMultyplayByPassenger(getAmount(priceItem.taxes), qty)
        );
        allPrice.push({
          key: priceItem.passengerType[0].code,
          value: priceItem.approximateBasePrice,
          pQty: qty,
          amount: Number(
            getMultyplayByPassenger(
              getAmount(priceItem.approximateBasePrice),
              qty
            )
          ),
        });

        totalPriceNAmnt += Number(
          getMultyplayByPassenger(
            getAmount(priceItem.approximateBasePrice),
            qty
          )
        );
        
      });

      setTaxItems({ totalTaxAmount: totalTaxNAmnt, details: allTax });
      setPriceItems({ totalPriceAmount: totalPriceNAmnt, details: allPrice });
    }
  }, []);

  const getMultyplayByPassenger = (amount, qty) => {
    if (amount !== undefined && qty !== undefined) {
      amount = Number(amount);
      qty = Number(qty);

      return amount * qty;
    }
  };

  const getAmount = (strAmount) => {
    if (strAmount !== undefined) {
      if (strAmount !== null) {
        if (0 >= currency.length || currency === "") {
          setCurrency(strAmount.substring(0, 3));
        }

        let amount = strAmount.substring(3);

        if (helperIsNumberString(amount)) {
          return amount;
        }
      }
    }

    return 0.0;
  };

  const getPassengerByCode = (pCode) => {
    let passengers = GET_PASSENGER;
    let selectedPassenger = "";

    if (passengers !== undefined) {
      passengers.map((paseenger, iDx) => {
        if (paseenger.key === pCode) {
          selectedPassenger = paseenger.value;
        }
      });
    }

    return selectedPassenger;
  };

  const toggolePriceOptions = () => {
    setPriceStstus(!priceStstus);
  };

  const toggleTaxOptons = () => {
    setTaxStatus(!taxStatus);
  };

  const getPriceFormat = (priceAmt) => {
    if (priceAmt !== undefined) {
      let cCode = "";
      let amnt = "";

      cCode = priceAmt.substring(0, 3);
      amnt = priceAmt.substring(3);

      return `${cCode}: ${amnt}`;
    }
    return "0.0";
  };

  return (
    <React.Fragment>
      <Card className="fare-sum-card">
        
        <Row>
          <Col md={12} className="fare-sum-price">
            <ul className="list-area">
              <li className="first-item">
                <p
                  className="far-title"
                  onClick={() => {
                    toggolePriceOptions();
                  }}
                >
                  
                  {priceStstus === false ? (
                    <i className="far fa-plus-square"></i>
                  ) : (
                    <i className="far fa-minus-square"></i>
                  )}{" "}
                  Base Price{" "}
                  <span className="fare-amount">
                    {priceStstus === false
                      ? `${currency}: ${priceItems.totalPriceAmount}`
                      : ""}
                  </span>
                </p>
                <ul
                  className="price-list"
                  style={{
                    display: `${priceStstus === true ? "block" : "none"}`,
                  }}
                >
                  {priceItems &&
                    priceItems.details.map((priceItem, pIdx) => {
                      return (
                        <li key={`fprice-${pIdx}`}>
                          <span className="fare-amount-label">
                            {priceItem.pQty > 1
                              ? `${getPassengerByCode(priceItem.key)}'(s) (${
                                  priceItem.pQty
                                } X ${getPriceFormat(priceItem.value)}): `
                              : `${getPassengerByCode(priceItem.key)} (${
                                  priceItem.pQty
                                } X ${getPriceFormat(priceItem.value)}): `}
                          </span>
                          <span className="fare-amount">
                            {`${currency}: ${priceItem.amount}`}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </li>
              <li className="first-item">
                <p
                  className="far-title"
                  onClick={() => {
                    toggleTaxOptons();
                  }}
                >
                  {taxStatus === false ? (
                    <i className="far fa-plus-square"></i>
                  ) : (
                    <i className="far fa-minus-square"></i>
                  )}{" "}
                  Fee & Taxes{" "}
                  <span className="fare-amount">
                    {taxStatus === false
                      ? `${currency}: ${taxItems.totalTaxAmount}`
                      : ""}
                  </span>
                </p>

                <ul
                  className="fess-tax-list"
                  style={{
                    display: `${taxStatus === true ? "block" : "none"}`,
                  }}
                >
                  <li>
                    <span>Total Fess & Surcharges: </span>
                    <span className="fare-amount">
                      {`${currency}: ${taxItems.totalTaxAmount}`}
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <p className="first-item">Other</p>
              </li>
            </ul>
            <p className="fare-total-amount">
              Total Amount:{" "}
              <span className="fare-amount">
                {`${currency} ${
                  taxItems.totalTaxAmount + priceItems.totalPriceAmount
                }`}
              </span>
            </p>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default FareSummary;
