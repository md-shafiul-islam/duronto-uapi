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
              <BookingItemCard
                flyOption={flyOption}
                bkElm={`bok-key-${idx}`}
                fareSummary={{
                  airTotalPrice: params.availAbleFlight.totalePrice,
                  airBasePrice: params.availAbleFlight.appoxBasePrice,
                  airTax: params.availAbleFlight.totalTax,
                }}
                cancel={params.availAbleFlight.cancel}
                change={params.availAbleFlight.change}
              />
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default FlyOptionList;
