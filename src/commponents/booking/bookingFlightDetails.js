import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
    helperGetTimeFormatMin,
    helperGetTimeFormatHr,
    helperGetFullDateFormat,
  } from "../../actions/helperAction";
import IconView from "../airSearch/iconView";
import { helperIsEmpty } from "../helper/helperAction";

const BookingFlightDetails = (props) =>{
    
    console.log("BookingFlightDetail props, ", props)

    const airPorts = useSelector(state => state.airSearch.airPortsList);
    
    const getCarrierByCode = (code)=>{
        if(!helperIsEmpty(airPorts)){
            
            let airPort = airPorts[code];

            if(!helperIsEmpty(airPort)){
                return airPort.name;
            }
        }

        return "Not Found ";
    }

    const getAirPortNaes = (carriers)=>{

        if(!helperIsEmpty(carriers)){
            return (
                <React.Fragment>
                    {carriers.map((carrier, idx)=>{
                        return <span>{getCarrierByCode(carrier)}</span>
                    })}
                </React.Fragment>
            )
        }

        return `Not Set yet !`;
    }
  return (
    <React.Fragment>
      <Row className="fly-time-inf txt-al-c one-way">
        <Col md={3}>
            <div className="air-inf">
                <div className="icon-area">
                <IconView selectedAirs={props.segment.carriers} iconSizeClass="icon-view-area-medium" />
                    
                </div>
                <div className="air-name">
                    {getAirPortNaes(props.segment.carriers)}
                </div>
            </div>
        </Col>
        <Col md={3}>
          <Row>
            <Col md={12} className="fly-hour">
              {`${helperGetTimeFormatHr(
                props.segment.fstDepTime
              )}:${helperGetTimeFormatMin(props.segment.fstDepTime)}`}
            </Col>
            <Col md={12}>
              {helperGetFullDateFormat(props.segment.fstDepTime)}
            </Col>
          </Row>
        </Col>
        <Col md={3} className="travel-time-each">
          <span className="tt-each">
            {props.segment.totalFlyTime}
          </span>
        </Col>
        <Col md={3}>
          <Row>
            <Col md={12} className="fly-hour">
              {`${helperGetTimeFormatHr(
                props.segment.lastArrivalTime
              )}:${helperGetTimeFormatMin(props.segment.lastArrivalTime)}`}
            </Col>
            <Col md={12}>
              {helperGetFullDateFormat(props.segment.lastArrivalTime)}
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default BookingFlightDetails;