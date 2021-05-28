/**
 *
 * @param {String day Start 1} d
 * @param {String month Start 1} m
 * @param {year} y
 */
export const getAge = (d, m, y) => {
  let date = new Date();
  d = d || 1;
  m = m || 0;
  if (y) {
    m = Number(m);
    d = Number(d);
    y = Number(y);
    m = m > 0 ? Number(m) - 1 : 0;
    date = new Date(y, m, d);
  }

  const ageDifMs = new Date().getTime() - date.getTime();
  const ageDate = new Date(ageDifMs);

  console.log(
    "DIF Age, ",
    ageDate,
    " MOnth, ",
    ageDate.getMonth(),
    " Day, ",
    ageDate.getDate()
  );

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const getAgeDetails = (d, m, y) => {
  let bDate = new Date();

  m = m || 0;
  d = d || 1;
  if (y) {
    m = Number(m) - 1;

    m = m >= 0 ? m : 0;
    d = Number(d);
    bDate = new Date(Number(y), m, d);
  }

  let bDay = bDate.getDate();
  let bM = bDate.getMonth();
  let bY = bDate.getFullYear();

  const cDate = new Date();

  let cD = cDate.getDate();
  let cM = cDate.getMonth();
  let cY = cDate.getFullYear();

  let age = { year: 0, months: 0, days: 0 };
  let ageString = "";

  let yearAge = cY - bY;
  let mAge = 0;
  let dateAge = 0;
  if (cM >= bM) {
    mAge = cM - bM;
  } else {
    yearAge--;
    mAge = 12 + cM - bM;
  }

  if (cD >= bDay) {
    dateAge = cD - bDay;
  } else {
    mAge--;
    dateAge = 31 + cD - bDay;

    if (mAge < 0) {
      mAge = 11;
      yearAge--;
    }
  }

  age.year = yearAge;
  age.months = mAge;
  age.days = dateAge;

  console.log("Age: ", JSON.stringify(age, null, 2));
  return age;
};

export const helperPreSetTravelr = (passenger, phone, email, status) => {
  // {
  //   bookingTravelerName: {
  //     first: "",
  //     last: "",
  //   },
  //   phoneNumber: null,
  //   email: null,
  //   travelerType: "",
  //   gender:"",
  // }

  const traveler = {
    bookingTravelerName: {
      first: "",
      last: "",
    },
    travelerType: "",
    gender: "",
  };

  let gender = "";

  if (passenger) {
    if (passenger.gender === "Male") {
      gender = "M";
    }

    if (passenger.gender === "Female") gender = "F";

    traveler.travelerType = passenger.type;
    traveler.bookingTravelerName.first = passenger.firstName;
    traveler.bookingTravelerName.last = passenger.lastName;
    traveler.gender = gender;

    if (passenger.type) {
      if (passenger.type === "INF") {
        traveler.age = getAgeDetails(
          passenger.day,
          passenger.month,
          passenger.year
        );

        //Date Formatt yyyy-MM-dd
        let month = passenger.month + 1;
        month = month < 10 ? `0${month}` : month;
        let dateString = `${passenger.year}-${month}-${passenger.year}`;
        traveler.dateOfB = dateString;
      }
    }
  }

  if (status) {
    let phoneNums = [];
    let emails = [];

    if (email) {
      emails.push({ emailID: email });
    }

    if (phone) {
      phoneNums.push({
        countryCode: phone.countryCode,
        number: phone.number,
      });
    }

    traveler.phoneNumber = phoneNums;
    traveler.email = emails;
  }

  return traveler;
};

/**
 *
 * @param {Number} count
 * @param {Number} base
 * @param {Number} status
 */
export const getNmsOptions = (count, base, status) => {
  const options = [];
  if (status === 1) {
    const date = new Date();

    let curentYear = date.getFullYear();
    for (let i = base; i < count; i++) {
      options.push({ label: curentYear, value: curentYear });
      curentYear--;
    }

    return options;
  }

  if (status === 0) {
    count = count + base;

    for (let i = base; i < count; i++) {
      if (base === 0) {
        options.push({ label: i + 1, value: i });
      } else {
        options.push({ label: i, value: i });
      }
    }
    return options;
  }
};

export const preSetBookingOption = (bookOption) => {
  if (bookOption) {
    let { airPriceOpt, segment } = bookOption;
    console.log("solution, ", airPriceOpt);
    console.log("segments, ", segment);

    let conn = {
      fareNote: null,
      changeOfPlane: false,
      changeOfTerminal: false,
      changeOfAirport: false,
      stopOver: false,
      minConnectionTime: null,
      duration: null,
      segmentIndex: 0,
      flightDetailsIndex: null,
      includeStopOverToFareQuote: null,
    };

    let {
      airPricingInfo,
      approximateBasePrice,
      approximateFees,
      approximateTaxes,
      approximateTotalPrice,
      basePrice,
      completeItinerary,
      equivalentBasePrice,
      fareNote,
      fees,
      hostToken,
      key,
      taxes,
      totalPrice,
      optionalServices,
      quoteDate,
      itinerary,
      services,
    } = airPriceOpt;

    let segs =
    segment &&
    segment.map((seg, idx) => {
        let {
          key,
          status,
          passive,
          travelOrder,
          providerSegmentOrder,
          elStat,
          keyOverride,
          sponsoredFltInfo,
          codeshareInfo,
          airAvailInfo,
          flightDetails,
          connection,
          sellMessage,
          railCoachDetails,
          openSegment,
          group,
          carrier,
          cabinClass,
          flightNumber,
          classOfService,
          equipment,
          marriageGroup,
          numberOfStops,
          seamless,
          changeOfPlane,
          guaranteedPaymentCarrier,
          hostTokenRef,
          providerReservationInfoRef,
          passiveProviderReservationInfoRef,
          optionalServicesIndicator,
          availabilitySource,
          blackListed,
          operationalStatus,
          numberInParty,
          railCoachNumber,
          bookingDate,
          flownSegment,
          scheduleChange,
          brandIndicator,
          flightTime,
          travelTime,
          distance,
          origin,
          destination,
          departureTime,
          arrivalTime,
          participantLevel,
          linkAvailability,
          polledAvailabilityOption,
          availabilityDisplayType,
          providerCode,
          supplierCode,
          eticketability,
          apisrequirementsRef,
        } = seg;

        if (connection !== undefined || connection !== null) {
          if (idx === 0) {
            conn = connection;
          }
        }

        return {
          key,
          status,
          passive,
          travelOrder,
          providerSegmentOrder,
          elStat,
          keyOverride,
          sponsoredFltInfo,
          codeshareInfo,
          airAvailInfo,
          flightDetails,
          connection: conn,
          sellMessage,
          railCoachDetails,
          openSegment,
          group,
          carrier,
          cabinClass,
          flightNumber,
          classOfService,
          equipment,
          marriageGroup,
          numberOfStops,
          seamless,
          changeOfPlane,
          guaranteedPaymentCarrier,
          hostTokenRef,
          providerReservationInfoRef,
          passiveProviderReservationInfoRef,
          optionalServicesIndicator,
          availabilitySource,
          blackListed,
          operationalStatus,
          numberInParty,
          railCoachNumber,
          bookingDate,
          flownSegment,
          scheduleChange,
          brandIndicator,
          flightTime,
          travelTime,
          distance,
          origin,
          destination,
          departureTime,
          arrivalTime,
          participantLevel,
          linkAvailability,
          polledAvailabilityOption,
          availabilityDisplayType,
          providerCode,
          supplierCode,
          eticketability,
          apisrequirementsRef,
        };
      });

    return {
      airSegment: segs,
      bookingInfo: airPricingInfo,
      fareNote: fareNote,
      hostToken: hostToken,
      optionalServices: optionalServices,
      key: key,
      completeItinerary: completeItinerary,
      quoteDate: quoteDate,
      itinerary: itinerary,
      totalPrice: totalPrice,
      basePrice: basePrice,
      approximateTotalPrice: approximateTotalPrice,
      approximateBasePrice: approximateBasePrice,
      equivalentBasePrice: equivalentBasePrice,
      taxes: taxes,
      fees: fees,
      services: services,
      approximateTaxes: approximateTaxes,
      approximateFees: approximateFees,
    };
  }
  return null;
};
