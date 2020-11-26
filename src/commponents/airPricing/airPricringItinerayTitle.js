import React, {useState} from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { helperGetTravelTime } from "../../actions/helperAction";
import AirFareRuleModal from "./airFareRuleModal";

const AirPricringItinerayTitle = (params) => {

  const [modalDisplay, setModalDisplay] = useState(false);

  const showFareRuleModal =()=>{
    setModalDisplay(!modalDisplay);
  }

  const hideModal = ()=>{
    setModalDisplay(false);
  }

  const getStopsLocs = (stoplocs)=>{

    if(stoplocs !== undefined){
      stoplocs.map((stp, idx)=>{
        return idx > 0 ? `, ${stp}` : stp;
      });
    }
  }
  return (
    <React.Fragment>
      <Row className="pricing">
        <Col md={2}>
            <div className="fly-label">
                <p className="fly-type">Depture</p>
                <p className="fly-date">SAT 15 Nov</p>
            </div>
        </Col>
        <Col md={5} className="price-fly-inf">
            <div className="locations">BOM-DEL</div>
            <div className="fly-inf">{params.stops > 0 ? `${params.stops} Stop `: "Non Stop "} | {helperGetTravelTime(params.totalFlyTime)} | {params.cabinClass}</div>
        </Col>
        <Col md={5}>
          <div className="icon-badge-inf">
            <Badge className="text"> Cancellation Fees Apply </Badge> 
             <span className="text">Fare Rule</span><span className="fare-info-icon" onClick={()=>{showFareRuleModal()}}><i className="fas fa-info"></i></span>
          </div>
        </Col>
      </Row>
      <Row>
        <AirFareRuleModal show={modalDisplay} setShow={()=>{hideModal()}} changePenalty={params.changePenalty} cancelPenalty={params.cancelPenalty} />
      </Row>
    </React.Fragment>
  );
};

export default AirPricringItinerayTitle;
 