import Axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { helperGetPriceReqQuery } from "../../../../actions/helperAction";
import { EXT_PRICE_URL, REQUEST_HEADER } from "../../../../actions/types";
import RoundTripPriceOptionModal from "../../../Modals/roundTripPriceOptionModal";
import RoundSelectedTab from "./RoundSelectedTab";

const StickyCard = (params) => {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [stickyPrice, setStickyPrice] =  useState({depResp:null, retResp:null});

  const [displayModal, setDisplayModal] = useState(false);

  const sendPricingRequest = async () => {

    if (params.flyOption != undefined) {
      if (params.flyOption) {

        let url = `${EXT_PRICE_URL}/api/v_1_0/buildfromproducts`;
        let resDepReturn = null;
        let resReturn = null;
        if (
          params.flyOption.returnOption !== undefined &&
          params.flyOption.departureOption !== undefined
        ) {
          if (
            params.flyOption.returnOption.totalPrice &&
            params.flyOption.departureOption.totalPrice !== undefined
          ) {
            if (params.flyOption.returnOption) {
              let searchQuery = helperGetPriceReqQuery(
                params.flyOption.returnOption,
                params.traveler
              );
              

              await Axios.post(url, searchQuery, {
                headers: REQUEST_HEADER,
              })
                .then((res) => {
                  resReturn = res.data;
                })
                .catch((err) => {
                  console.log("Axios Error: ", err);
                });

              console.log("Air Price After Request Query: resReturn", resReturn);

            }

            if (params.flyOption.departureOption) {
              let depSearchQuery = helperGetPriceReqQuery(
                params.flyOption.departureOption,
                params.traveler
              );
              
              
              await Axios.post(url, depSearchQuery, {
                headers: REQUEST_HEADER,
              })
                .then((res) => {
                  
                  resDepReturn = res.data;
                })
                .catch((err) => {
                  console.log("Axios Error: ", err);
                });
                console.log("Air Price After Request Query: resDepReturn ", resDepReturn);
              
            }

            if(resReturn !== null && resDepReturn !== null){
              
              console.log("Air Price Request Query: resReturn", resReturn);
              console.log("Air Price Request Query: resDepReturn", resDepReturn);

              setStickyPrice({depResp:resDepReturn, retResp:resReturn})

              prePopulatePricingModal();

              setDisplayModal(true);
            }


          }
        }
      }
    }
  };

  const toggleDisplay = () => {
    const view = displayDetails;
    setDisplayDetails(!view);
  };

  const prePopulatePricingModal = ()=>{
    
    console.log("Air Segment Price Prepopulate: ", stickyPrice);
 
  }

  const getTimeFormatHr = (timeValue) => {
    if (timeValue != undefined) {
      if (timeValue === null) {
        return "0.0";
      }

      let dateTime = new Date(timeValue);
      let hr = null;

      if (dateTime) {
        hr =
          dateTime.getHours() < 9
            ? `0${dateTime.getHours() + 1}`
            : `${dateTime.getHours() + 1}`;

        if (!isNaN(hr)) {
          return hr;
        }
      }
    }
    return "00";
  };

  const getTimeFormatMin = (timeValue) => {
    if (timeValue != undefined) {
      if (timeValue === null) {
        return "0.0";
      }

      let dateTime = new Date(timeValue);
      let min = null;

      if (dateTime) {
        min =
          9 >= dateTime.getMinutes()
            ? `0${dateTime.getMinutes()}`
            : `${dateTime.getMinutes()}`;

        if (!isNaN(min)) {
          return min;
        }
      }

      return "00";
    } else {
      return "00";
    }
  };

  const getPrice = (amount) => {
    let price = "0.0";

    if (amount === undefined || amount === null) {
      return price;
    }
    return (
      <React.Fragment>
        <span className="curency-code">{amount.substring(0, 3)}:</span>
        <span className="rnde-amount"> {amount.substring(3)}</span>
      </React.Fragment>
    );
  };

  const getTotalAirPrice = (depPrice, retnPrice) => {
    if (
      depPrice === undefined ||
      depPrice === null ||
      retnPrice === undefined ||
      retnPrice === null
    ) {
      return "0.0";
    }

    let currency = "";
    let dPrice,
      rPrice,
      totalPrice = 0;

    currency = depPrice.substring(0, 3);

    dPrice = Number(depPrice.substring(3));
    rPrice = Number(retnPrice.substring(3));

    totalPrice = Number(dPrice + rPrice);

    return (
      <React.Fragment>
        <span className="curency-code">{currency}:</span>
        <span className="rnde-amount">{` ${totalPrice}`}</span>
      </React.Fragment>
    );
  };

  return (
    <div className="item-sticky">
      <Row className="sticky-part">
        <Col md={8}>
          <Row className="mp-0">
            <Col md={6} className="sl-item">
              <p className="fly-inf">
                Departure | Air India |{" "}
                {params.flyOption &&
                  params.flyOption.departureOption &&
                  params.flyOption.departureOption.flightNumbers.map(
                    (flNo, idx) => {
                      return <span>{idx > 0 ? `, ${flNo}` : flNo}</span>;
                    }
                  )}
              </p>
              <Row>
                <Col md={2} className="icon"></Col>
                <Col md={5} className="rnd-time">
                  <span>
                    {getTimeFormatHr(
                      params.flyOption &&
                        params.flyOption.departureOption &&
                        params.flyOption.departureOption.flyDepartureTime
                    )}
                    :
                    {getTimeFormatMin(
                      params.flyOption &&
                        params.flyOption.departureOption &&
                        params.flyOption.departureOption.flyDepartureTime
                    )}{" "}
                  </span>
                  <span>
                    <i class="fas fa-arrow-right fa-sm"></i>{" "}
                  </span>
                  <span>
                    {getTimeFormatHr(
                      params.flyOption &&
                        params.flyOption.departureOption &&
                        params.flyOption.departureOption.flyArrivalTime
                    )}
                    :
                    {getTimeFormatMin(
                      params.flyOption &&
                        params.flyOption.departureOption &&
                        params.flyOption.departureOption.flyArrivalTime
                    )}
                  </span>
                </Col>
                <Col md={5} className="price">
                  {getPrice(
                    params.flyOption &&
                      params.flyOption.departureOption &&
                      params.flyOption.departureOption.totalPrice
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={6} className="sl-item">
              <p className="fly-inf">
                Return | Air India |{" "}
                {params.flyOption &&
                  params.flyOption.returnOption &&
                  params.flyOption.returnOption.flightNumbers.map(
                    (rflNo, ridx) => {
                      return <span>{ridx > 0 ? `, ${rflNo}` : rflNo}</span>;
                    }
                  )}
              </p>
              <Row>
                <Col md={2} className="icon"></Col>
                <Col md={5} className="rnd-time">
                  <span>
                    {getTimeFormatHr(
                      params.flyOption &&
                        params.flyOption.returnOption &&
                        params.flyOption.returnOption.flyDepartureTime
                    )}
                    :
                    {getTimeFormatMin(
                      params.flyOption &&
                        params.flyOption.returnOption &&
                        params.flyOption.returnOption.flyDepartureTime
                    )}{" "}
                  </span>
                  <span>
                    <i class="fas fa-arrow-right fa-sm"></i>{" "}
                  </span>
                  <span>
                    {getTimeFormatHr(
                      params.flyOption &&
                        params.flyOption.returnOption &&
                        params.flyOption.returnOption.flyArrivalTime
                    )}
                    :
                    {getTimeFormatMin(
                      params.flyOption &&
                        params.flyOption.returnOption &&
                        params.flyOption.returnOption.flyArrivalTime
                    )}
                  </span>
                </Col>
                <Col md={5} className="price">
                  {getPrice(
                    params.flyOption &&
                      params.flyOption.returnOption &&
                      params.flyOption.returnOption.totalPrice
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="rnd-slc-price">
          <Row className="rnd-price-area">
            <Col md={6}>
              <div className="total-amount">
                {getTotalAirPrice(
                  params.flyOption &&
                    params.flyOption.returnOption &&
                    params.flyOption.returnOption.totalPrice,
                  params.flyOption &&
                    params.flyOption.departureOption &&
                    params.flyOption.departureOption.totalPrice
                )}
              </div>
            </Col>
            <Col md={5}>
              <Button
                className="booking-btn"
                onClick={() => {
                  sendPricingRequest();
                }}
              >
                Book Now
              </Button>
            </Col>
            <Col
              md={1}
              className="mp-0 f-siz2em"
              onClick={(e) => {
                toggleDisplay();
              }}
            >
              <i
                class="fas fa-angle-up"
                style={{
                  transform: `${displayDetails ? "rotateZ(-180deg)" : ""}`,
                  cursor: "pointer",
                }}
              ></i>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        className={`rnd-fly-details ${
          displayDetails === true ? "fly-active" : "fly-inactive"
        }`}
      >
        <Col md={12}>
          <RoundSelectedTab flyOption={params.flyOption} />
        </Col>
      </Row>
      <RoundTripPriceOptionModal display={displayModal} modalAction={(displayStatus)=>{
        setDisplayModal(displayStatus);
      }} selectedPricingOptions={stickyPrice} setRndTripOptionsDetails={(pricingOptions)=>{
        params.getSelectedPricingOptions(pricingOptions);
      }} />
    </div>
  );
};

export default StickyCard;
