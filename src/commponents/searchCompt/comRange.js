import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";

/**
 *
 * @param {populateItem, items[{name:'', value:number}], ulClass} props
 */
const ComRange = (props) => {
  const [selected, setSelected] = useState(props.populateItem);

  /*
  useEffect(() => {
    setSelected(props.populateItem);
  }, []);*/

  const toggleItem = (item) => {
    setSelected(item.value);
    props.getData(item);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="range">
          <p className={props.headerClass}>{props.headerText}</p>
          <ul className={props.ulClass && props.ulClass}>
            {props.items &&
              props.items.map((item, i) => {
                return (
                  <li
                    key={`${props.keyFix}-${i}`}
                    className={`${
                      selected === item.value
                        ? props.itemClass + " selected"
                        : props.itemClass
                    }`}
                    onClick={(e) => toggleItem(item)}
                  >
                    {item.name}
                  </li>
                );
              })}
          </ul>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ComRange;
