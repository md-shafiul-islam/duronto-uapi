import React, {useState, useEffect} from "react";
import { Card, Col, Row } from "react-bootstrap";
import { helperIsNumberString } from "../../../actions/helperAction";
import { GET_PASSENGER } from "../../../actions/types";

/**
 * @Array airPriceList All Air Price witth key &  Passenger Qty,
 * @param {airPriceList} params
 */
const FareSummaryUsingPriceList = (params) => {
  const [priceStstus, setPriceStstus] = useState(false);
  const [taxStatus, setTaxStatus] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);
  const [totalPriceAmt, setTotalPriceAmt] = useState(0);

  const [totalTaxAmount, setTotalTaxAmount] = useState(0);

  const [priceItems, setPriceItems] = useState({
    totalPriceAmount: 0.0,
    details: [],
  });
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    console.log("FareSummaryUsingPriceList Params: ", params);
    initFareDate();
  }, [])
  
  const initFareDate = ()=>{
    if(params.airPriceList !== undefined){

        let totalPrice = 0;
        let totalPriceDetails = [];
        let totalTax = 0;
        let basePriceEach  = 0;
        let currency = "";

        params.airPriceList.map((airPrice, idx)=>{

            let tBasePrice = 0;
            console.log("FareSummaryUsingPriceList Params: Each One, ", airPrice);

            tBasePrice += (airPrice.basePrice * airPrice.passengerQty);
            totalPrice += (airPrice.totalPrice * airPrice.passengerQty);

            totalPriceDetails.push({key:airPrice.key, qty:airPrice.passengerQty, basePrice:tBasePrice});
            totalTax += (airPrice.tax * airPrice.passengerQty);
            currency = airPrice.currency;
        });

        setTotalTaxAmount(totalTax);
        setPriceItems({details:totalPriceDetails});
        setTotalPriceAmt(totalPrice);
        setCurrency(currency);
        setLoadStatus(true);


     }
  }

  

  /* ES Functions Start */
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

  // ES Functions End
  return (
    <React.Fragment>
        {console.log("FareSummaryUsingPriceList, totalPriceAmnt", totalPriceAmt)}
        {console.log("FareSummaryUsingPriceList, totalTaxAmount", totalTaxAmount)}
        {console.log("FareSummaryUsingPriceList, priceItems", priceItems)}
       
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
                      ? `${currency}: ${0}`
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
                      {`${currency}: ${0}`}
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
                  0
                }`}
              </span>
            </p>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default FareSummaryUsingPriceList;
