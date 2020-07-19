import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import ComRange from "./comRange";

const passRang = [
  { name: "0", value: 0 },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
];

const passChRang = [
  { name: "0", value: 0 },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
];

const passClassRange = [
  { name: "Business", value: 0 },
  { name: "Economy/Premium Economy", value: 1 },
  { name: "Premium Economy", value: 2 },
];

const TravellersAndClass = (props) => {
  const [child, setChild] = useState(undefined);
  const [infants, setInfants] = useState(undefined);
  const [adults, setAdults] = useState(undefined);
  const [cabinClass, setCabinClass] = useState(undefined);
  const [totalTraveler, setTotalTraveler] = useState(0);

  const [display, setDisplay] = useState(false);

  const getIntData = (item) => {
    let val =
      item !== undefined ? (item.value !== undefined ? item.value : 0) : 0;

    console.log("Befor Return: ", val);
    return val;
  };

  const setTotalTravelerData = (child, infants, adults) => {
    let total = 0;

    let chData = getIntData(child);
    let infantsData = getIntData(infants);
    let adultData = getIntData(adults);

    total = adultData + infantsData + chData;

    console.log("Total: ", total);
    setTotalTraveler(total);
  };

  const setChildData = (item) => {
    console.log("CH: ", item);
    setChild(item);

    setTotalTravelerData(item, infants, adults);
  };

  const setInfantsData = (item) => {
    console.log("Inf: ", item);
    setInfants(item);
    setTotalTravelerData(child, item, adults);
  };

  const setAdultsData = (item) => {
    console.log("Adt: ", item);
    setAdults(item);
    setTotalTravelerData(child, infants, item);
  };

  const setClassData = (item) => {
    setCabinClass(item);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="traveler">
          <Card>
            <Card.Title
              onClick={(e) => {
                setDisplay(!display);
              }}
            >
              Travellers & CLASS
            </Card.Title>
            <Card.Body>
              <Row>
                <Col md={12} className="traveler-card-body">
                  <p>{totalTraveler} Travellers</p>
                  <p className="travellerClass">
                    {cabinClass ? cabinClass.name : ""}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card
            className="traveler-card"
            style={{ visibility: display ? "visible" : "hidden" }}
          >
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Row>
                    <Col md={9}>
                      <ComRange
                        items={passRang}
                        populateItem={0}
                        keyFix="adt"
                        ulClass="rang-list"
                        itemClass="item"
                        headerClass=""
                        headerText="ADULTS (12y +)"
                        getData={(item) => setAdultsData(item)}
                      />
                    </Col>
                    <Col md={3}></Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <ComRange
                        items={passChRang}
                        populateItem={0}
                        keyFix="chi"
                        ulClass="rang-list"
                        itemClass="item"
                        headerText="CHILDREN (2y - 12y )"
                        getData={(item) => setChildData(item)}
                      />
                    </Col>
                    <Col md={6}>
                      <ComRange
                        items={passChRang}
                        populateItem={0}
                        keyFix="inf"
                        ulClass="rang-list"
                        itemClass="item"
                        headerText="INFANTS (below 2y)"
                        getData={(item) => setInfantsData(item)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <ComRange
                        items={passClassRange}
                        populateItem={0}
                        keyFix="inf"
                        ulClass="rang-list"
                        itemClass="item"
                        headerText="CHOOSE TRAVEL CLASS"
                        getData={(item) => setClassData(item)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    variant="primary"
                    onClick={(e) =>
                      props.getAllRangeData(adults, child, infants, cabinClass)
                    }
                  >
                    Apply
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TravellersAndClass;
