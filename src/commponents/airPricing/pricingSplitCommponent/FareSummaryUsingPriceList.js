import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { GET_PASSENGER } from "../../../actions/types";

/**
 * airPriceList Data Structure
 * [
  {
    "key": "ADT",
    "basePrice": 22549,
    "tax": 2605,
    "totalPrice": 25154,
    "passengerQty": 2,
    "currency": "BDT"
  },
  {
    "key": "CNN",
    "basePrice": 22549,
    "tax": 2605,
    "totalPrice": 25154,
    "passengerQty": 2,
    "currency": "BDT"
  },
  {
    "key": "INF",
    "basePrice": 4618,
    "tax": 748,
    "totalPrice": 5366,
    "passengerQty": 2,
    "currency": "BDT"
  }
]
 */
/**
 * @Array airPriceList All Air Price witth key &  Passenger Qty,
 * @param {airPriceList} params
 */
const FareSummaryUsingPriceList = (params) => {
  const [priceStstus, setPriceStstus] = useState(false);
  const [taxStatus, setTaxStatus] = useState(false);

  const [totalPriceAmt, setTotalPriceAmt] = useState(0);
  const [totalBasePriceAmnt, setTotalBasePriceAmnt] = useState(0);

  const [totalTaxAmount, setTotalTaxAmount] = useState(0);

  const [priceItems, setPriceItems] = useState({
    totalPriceAmount: 0.0,
    details: [],
  });
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    initFareDate();
  }, []);

  const initFareDate = () => {
    if (params.airPriceList !== undefined) {
      let totalPrice = 0;
      let totalPriceDetails = [];
      let totalTax = 0;
      let totalBasePrice = 0;
      let currency = "";

      params.airPriceList.map((airPrice, idx) => {
        let tBasePrice = 0;

        tBasePrice += airPrice.basePrice * airPrice.passengerQty;
        totalPrice += airPrice.totalPrice * airPrice.passengerQty;
        totalBasePrice += airPrice.basePrice * airPrice.passengerQty;

        totalPriceDetails.push({
          key: airPrice.key,
          qty: airPrice.passengerQty,
          totalPasBasePrice: tBasePrice,
          eachBasePrice: airPrice.basePrice,
        });
        totalTax += airPrice.tax * airPrice.passengerQty;
        currency = airPrice.currency;
      });

      setTotalTaxAmount(totalTax);
      setPriceItems({ details: totalPriceDetails });
      setTotalPriceAmt(totalPrice);
      setTotalBasePriceAmnt(totalBasePrice);
      setCurrency(currency);
    }
  };

  /* ES Functions Start */

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

  // ES Functions End
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
                      ? `${currency}: ${totalBasePriceAmnt}`
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
                            {priceItem.qty > 1
                              ? `${getPassengerByCode(priceItem.key)}'(s) (${
                                  priceItem.qty
                                } X ${priceItem.eachBasePrice}): `
                              : `${getPassengerByCode(priceItem.key)} (${
                                  priceItem.qty
                                } X ${priceItem.eachBasePrice}): `}
                          </span>
                          <span className="fare-amount">
                            {`${currency}: ${priceItem.totalPasBasePrice}`}
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
                      ? `${currency}: ${totalTaxAmount}`
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
                      {`${currency}: ${totalTaxAmount}`}
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
                {`${currency} ${totalPriceAmt}`}
              </span>
            </p>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default FareSummaryUsingPriceList;
