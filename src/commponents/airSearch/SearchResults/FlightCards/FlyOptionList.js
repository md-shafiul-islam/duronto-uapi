import React from "react";
import BookingItemCard from "./BookingItemCard";

const FlyOptionList = (params) => {
  return (
    <React.Fragment>
      {params.availAbleFlight &&
        params.availAbleFlight.flyOptions &&
        params.availAbleFlight.flyOptions.map((flyOption, idx) => {
          return (
            <React.Fragment>
              <BookingItemCard flyOption={flyOption} bkElm={`bok-key-${idx}`} />
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default FlyOptionList;
