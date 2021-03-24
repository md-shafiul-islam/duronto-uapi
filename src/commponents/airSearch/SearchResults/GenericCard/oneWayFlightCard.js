import React, {useEffect, useState} from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { helperGetPrice, helperGetPriceDetails, helperGetTimeFormatHr, helperGetTimeFormatMin, helperGetTotalFlyTimeReadable, helperGoBookingOption } from '../../../helper/helperAction';
import OneWayPriceCard from '../FlightCards/OneWayPriceCard';
import SelectedTab from '../SelectedTab';


/**
 * 
 * @param {
 *  airPriceInfos: {approximateFees: , approximateTaxes: "USD401.05", approximateTotalPrice: "USD851.05", basePrice: "USD450.00", taxes: "USD401.05", approximateBasePrice: "USD450.00"}
 *           airSegments: [] * 
 * cancelPenalty: []
 * changePenalty: []
 * destination: "NYC"
 * id: 0
 * option: {bookingInfo: Array(2), connection: Array(1), key: "mns5KhAqWDKA57h6AAAAAA==", travelTime: "P0DT20H55M0S"}
 * origin: "DAC"
 * 
 * } params 
 * @returns {One Way Search Result Card}
 */
const OneWayFlightCard = (params) => {

    console.log("OneWayFlightCard ", params);
    const [priceDisplay, setPriceDisplay] = useState(false);
    const [display, setDisplay] = useState(false);
    
    const [initOpt, setInitOpt] = useState({segments:[], cabinClasses:[], carriers:[], flightNumbers:[], firstDepartureTime:"", lastArrivalTime:"", stops:[], totalTravelTime:""});
    
    console.log("OneWayFlightCard display: ", display);
    console.log("OneWayFlightCard display: ", display);
    useEffect(() => {

        const segs = [];
        let carrs = [];
        let flNums = [];
        let cClass = [];
        let dTime = "";
        let aTime = "";
        let stops = [];
        let totalTime = helperGetTotalFlyTimeReadable(params.option.travelTime);
        

        if(params !== undefined){
            if(params.airSegments !== undefined && params.option !== undefined){

                params.option.bookingInfo&&params.option.bookingInfo.forEach((bookOpt, idx)=>{

                    if(bookOpt !== undefined){
                        let sSeg = params.airSegments[bookOpt.segmentRef];

                        segs.push(sSeg);

                        if(idx === 0){
                            dTime = sSeg.departureTime;
                        }

                        aTime = sSeg.arrivalTime;
                        
                        if(!cClass.includes(bookOpt.cabinClass)){
                            cClass.push(bookOpt.cabinClass);
                        }

                        if(!flNums.includes(sSeg.flightNumber)){
                            flNums.push(sSeg.flightNumber);
                        }

                        if(!carrs.includes(sSeg.carrier)){
                            carrs.push(sSeg.carrier);
                        }

                        if(idx > 0 && params.option.bookingInfo.length > idx){
                            stops.push(sSeg.destination);
                        }
                    }
                })
                

            }
        }

        setInitOpt({
            segments:segs,
            cabinClasses:cClass,
            carriers:carrs,
            flightNumbers:flNums,
            firstDepartureTime:dTime,
            lastArrivalTime:aTime,
            stops:stops,
            totalTravelTime:totalTime
        });
        
        console.log("State stops: ", initOpt.stops);

    }, []);

    const toggleDisplay = ()=>{
        setDisplay(!display);
    }

    const tooglePriceView = ()=>{
        setPriceDisplay(!priceDisplay);
    }
    
    const flyTimeStops = ()=>{
        
    
        return (
            <React.Fragment>
              <div>
                <span>{initOpt.totalTravelTime}</span>
              </div>
              <div className="line-area">
                <ul className="route-air-line">
                  {initOpt.stops &&
                    initOpt.stops.map((item, idx) => {
                      return <li key={`ral-${idx}`} className="air-point">&nbsp;</li>;
                    })}
                </ul>
              </div>
              <div className="line-airport">
                <p>
                  { initOpt.stops &&initOpt.stops.length > 0 ? initOpt.stops.length : "Non"} stop {initOpt.stops&&initOpt.stops.length > 0 ? " via " : "" }{""}
                  {initOpt.stops &&
                    initOpt.stops.map((stop, i) => {
                      return <span key={`las-${i}`}>{stop}</span>;
                    })}
                </p>
              </div>
            </React.Fragment>
          )
    }
    return (
        <React.Fragment key={`book-option-idx${params.id}`}>
            <Card className="booking-card">
                <Card.Body>
                    <Row className="fly-inf-area">
                    <Col md={3}>
                        <div>
                        {initOpt.carriers&&
                            initOpt.carriers.map((carrier, idx) => {
                            return <span key={`carrier-${idx}`} className="air-icon">{idx > 0 ? " | " : ""}{carrier}</span>;
                            })}
                        </div>

                        <div>
                        {initOpt.flightNumbers &&
                            initOpt.flightNumbers.map((num, fidx) => {
                            return (
                                <React.Fragment key={`flightNumbers-${fidx}`}>
                                <span className="air-number">
                                    {fidx > 0 ? " | " : ""} {num}
                                </span>
                                </React.Fragment>
                            );
                            })}
                        </div>
                    </Col>

                    <Col md={5}>
                        <Row>
                        <Col md={4}>
                            <div className="fly-time-inf">
                            <span className="fly-hour">
                                {helperGetTimeFormatHr(
                                    initOpt.firstDepartureTime
                                )}
                                {":"}
                            </span>
                            <span className="fly-min">
                                {helperGetTimeFormatMin(
                                    initOpt.firstDepartureTime
                                )}
                            </span>
                            </div>
                            <div className="fly-loc-inf">
                            <span>
                                {params &&
                                params.origin}
                            </span>
                            </div>
                        </Col>

                        <Col md={4}>
                            <span className="travel-time">
                            {flyTimeStops()}
                            </span>
                        </Col>

                        <Col md={4}>
                            <div className="fly-time-inf">
                            <span className="fly-hour">
                                {helperGetTimeFormatHr(
                                    initOpt.lastArrivalTime
                                )}
                                {":"}
                            </span>
                            <span className="fly-min">
                                {helperGetTimeFormatMin(
                                    initOpt.lastArrivalTime
                                )}
                            </span>
                            </div>
                            <span className="fly-loc-inf">
                            {params &&
                                params.destination}
                            </span>
                        </Col>
                        </Row>
                    </Col>

                    <Col md={4}>
                        <Row>
                        <Col md={7}>
                            <span className="price">
                            {helperGetPrice(params.airPriceInfos&&params.airPriceInfos.totalPrice)}
                            </span>
                        </Col>

                        <Col md={5}>
                            <Button
                            onClick={() => {
                                
                                helperGetPriceDetails(params.airPriceInfos);
                                tooglePriceView();
                            }}
                            >
                            View Price
                            </Button>
                        </Col>
                        </Row>
                    </Col>
                    </Row>

                    <Row
                    className={`fly-details-area ${
                        priceDisplay === true ? " active-price-view" : " "
                    }`}
                    >
                    <Col md={12} className="lfp-0 ">
                        <ul
                        className={`fly-title`}
                        onClick={() => {
                            toggleDisplay();
                        }}
                        >
                        <li
                            className={`fly-details-btn ${
                            display === true ? "expand" : ""
                            }`}
                        >
                            Flight Details
                        </li>
                        </ul>
                        <div
                        className={`fly-accrodian ${
                            display === true ? "active" : "inactive"
                        }`}
                        >
                        
                        <SelectedTab
                            bookInfos={params.option&&params.option.bookingInfo}
                            getTimeFormatHr={helperGetTimeFormatHr}
                            getTimeFormatMin={helperGetTimeFormatMin}
                            carriers={initOpt.carriers}
                            flightNumbers={initOpt.flightNumbers}
                            totalTravelTime={initOpt.totalTravelTime}
                            travelInf={{
                            firstOrigin: params.origin,
                            lastDestination: params.destination,
                            }}
                            
                            fareSummary={params.airPriceInfos}
                            cancel={params.cancelPenalty}
                            change={params.changePenalty}
                            segments={params.airSegments}
                            fareInfos={params.fareInfos}
                        />

                        </div>
                    </Col>
                    </Row>
                    
                    <Row
                    className="one-way-price-details"
                    style={{
                        display: priceDisplay === true ? "block" : "none",
                    }}
                    >
                    <OneWayPriceCard
                        //priceInf={this.state.priceInfo.orgResponse}
                        getSelectedFlight={(selectedData) => {
                            helperGoBookingOption(selectedData);
                        }}
                    />
                    </Row>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
  
}

export default OneWayFlightCard;
