import React, { useState, useEffect, useRef } from "react";
import { Card, Col } from "react-bootstrap";

const SearchOption = (props) => {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [display, setDisplay] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("Event Outside Click!!");
        if (display === true) {
          setDisplay(false);
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    setSelectedItem(props.populateItem);
    setDisplay(!display);
  }, [props.populateItem]);

  const toggleDisplay = () => {
    setDisplay(!display);
    console.log("Display: ", display);
  };

  return (
    <React.Fragment>
      <Card className={props.cardClass}>
        <Card.Body ref={ref}>
          <Card.Title onClick={toggleDisplay}>{props.title}</Card.Title>
          <Card.Text onClick={toggleDisplay}>
            {selectedItem && (
              <React.Fragment>
                <Col>
                  <h3>{selectedItem.name}</h3>
                  <span>{selectedItem.code}</span>
                </Col>
              </React.Fragment>
            )}
          </Card.Text>
          {display && props.children}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default SearchOption;
