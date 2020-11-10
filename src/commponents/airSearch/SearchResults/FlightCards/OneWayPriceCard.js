import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';

const OneWayPriceCard = (params) =>{

    const setBookOption = (priceOption)=>{
        
        console.log("Air Price Params: ", params);

        

        let {airItinerary, responseMessage, transactionId, traceId} = params.priceInf;

        let selectedData = {
            airItinerary:airItinerary, 
            responseMessage:responseMessage, 
            transactionId:transactionId, 
            traceId:traceId, 
            flightOption:priceOption
        };

        console.log("Befor Air Price Send : ", selectedData);
        params.getSelectedFlight(selectedData);
    }

    const getPriceFormat = (approximateTotalPrice)=>{
        if(approximateTotalPrice){

            let currency, amount = "";

            currency = approximateTotalPrice.substring(0,3);
            amount = approximateTotalPrice.substring(3);

            return `${currency} ${amount}`;
        }
        return " ";
    }

    const getPriceDetailsText = (pTexts, approximateTotalPrice, lbrand, eachPrice)=>{
        let marketingConsumer, upsell = "";

        console.log("Text Lenght: ", pTexts.length, " Solutions: Price ", approximateTotalPrice);
        if(pTexts !== undefined){
            pTexts.map((text, Idx)=>{

                if(text.type === "MarketingConsumer"){
                    marketingConsumer = text.value;
                }

                if(text.type === "Upsell"){
                    upsell = text.value;
                }
            });

            marketingConsumer = marketingConsumer !== undefined ? marketingConsumer !== null ? marketingConsumer.split("•") : marketingConsumer  : marketingConsumer;
            upsell = upsell !== undefined ? upsell !== null ? upsell.split("•") : upsell : upsell;


            //marketingConsumer.shift();
            //upsell.shift();

            return(
                <React.Fragment>

                    <Row>
                        <Col md={8}>
                            <ul className="price-info-ul">
                                
                                {lbrand.name !== null ? marketingConsumer&&marketingConsumer.map((item, idx)=>{
                                    
                                    if(item !== undefined){
                                        console.log("Price Detaisl Text: Pass Undefined: ", item);
                                        if(item === null || item.length === 0){
                                            console.log("Price Pass Null Lenght 0: ", item);
                                            return(<li>Not Available Fly Details Information</li>)
                                        }
                                    }else{
                                        return(<li>Not Available Fly Details Information</li>);
                                    }
                                    return(<li>{idx === 0 ? "" : <i class="far fa-check-square"></i>} {item}</li>)
                                }) : <li>Not Available Fly Details Information</li>}
                            </ul>
                            <ul className="price-upsell-ul">
                                {upsell&&upsell.map((uItem, uIdx)=>{
                                    console.log("UpSell Lenght: ", uItem.length , " Text: ", uItem);
                                    if(uItem !== null && uItem.length > 0){
                                       return(<li><i class="far fa-check-square"></i> {uItem}</li>)
                                    }
                                   
                                })}
                            </ul>
                        </Col>
                        <Col md={4}>
                            <Row className="one-way-price-tag-line">
                                <Col md={6}><p className="one-way-price">{getPriceFormat(approximateTotalPrice)}</p></Col>
                                <Col md={6}><Button onClick={()=>{setBookOption(eachPrice)}}>Book Now</Button></Col>
                            </Row>
                        </Col>
                    </Row>

                </React.Fragment>
            );
        }
        return "From Text Function!!";
    }

    console.log("One Way Price : ", params.priceInf.airPriceResult);
    return (
        <React.Fragment>
            <Row>

                {params.priceInf && params.priceInf.airPriceResult.map((airPrice, apsIdx)=>{

                    return(
                        <React.Fragment>
                           
                            {airPrice.airPricingSolution && airPrice.airPricingSolution.map((priceSolutaion, slIdx)=>{
                                return(
                                    <React.Fragment>
                                        {console.log("Price Solutaion: ", priceSolutaion)}
                                        
                                        {priceSolutaion && priceSolutaion.airPricingInfo.map((eachPrice, eIdx)=>{
                                           let {baggageAllowances, approximateTotalPrice, cancelPenalty, changePenalty, fareInfo} = eachPrice;
                                           let singleFareInf = fareInfo.length > 0 ? fareInfo[0] : undefined;

                                           let brand = singleFareInf !== undefined ? singleFareInf.brand : undefined;
                                            return(
                                                <React.Fragment>

                                                    <Col md={12} className="price-details-option">
                                                        {brand !== undefined ? 
                                                        <React.Fragment>

                                                            <div className="fly-price-inf">

                                                                {getPriceDetailsText(brand.text, approximateTotalPrice, brand, eachPrice)}

                                                                <ul className="penalty-ul">
                                                                    {console.log("Price Panelty: Cancel ", cancelPenalty, " Change: ", changePenalty)}

                                                                    <li><i class="far fa-check-square"></i> Cancellation fee {cancelPenalty[0] !== undefined ? cancelPenalty[0] !== null ? cancelPenalty[0].amount !== null ? <React.Fragment> starting <b>{getPriceFormat(cancelPenalty[0].amount)}</b></React.Fragment> : ' Not Available' : ' Not Available' : ' Not Available'} </li>
                                                                    <li><i class="far fa-check-square"></i> Date change fee {changePenalty[0] !== undefined ? changePenalty[0] !== null ?  changePenalty[0].amount !== null ? <React.Fragment> starting <b>{getPriceFormat(changePenalty[0].amount)}</b></React.Fragment> : " Not Available" : " Not Available" : " Not Available"} </li>
                                                                    
                                                                </ul>

                                                            </div>

                                                        </React.Fragment> 
                                                        : ""}
                                                        

                                                    </Col>

                                                </React.Fragment>
                                            )
                                        })}

                                    </React.Fragment>
                                )
                            })}
                            

                        </React.Fragment>
                    )

                })}

            </Row>
        </React.Fragment>
    )
}

export default OneWayPriceCard;