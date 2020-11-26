import { GET_DAYES, GET_MONTHS } from "./types";

export const helperGetTotalFlyTimeBetweenTwoDate = (prevDateTime, cDateTime) => {
  //1000 milsec to sec
  const preDate = new Date(prevDateTime);
  const curDate = new Date(cDateTime);

  let diffTime = Math.abs(curDate - preDate);

  let hrs,
    hMints = 0;
  let mints = Number(Math.floor(diffTime / 60000));
  let sec = ((diffTime % 60000) / 1000).toFixed(0);
  hrs = Number(Math.floor(mints / 60));

  if (hrs > 0) {
    hMints = hrs * 60;
  }

  hMints = Number(hMints);
  mints = Number(mints);

  if (hMints > 0) {
    mints = mints - hMints;
  }

  return `${hrs} hr ${mints} min`;
};

export const helperGetTimeFormatHr = (timeValue) => {
  if (timeValue != undefined) {
    let dateTime = new Date(timeValue);
    let hr = null;

    if (dateTime) {
      hr =
        dateTime.getHours() < 9
          ? `0${dateTime.getHours() + 1}`
          : `${dateTime.getHours() + 1}`;

      if (!isNaN(hr)) {
        return hr;
      }
    }
  }
  return "00";
};

export const helperGetTimeFormatMin = (timeValue) => {
  if (timeValue != undefined) {
    let dateTime = new Date(timeValue);
    let min = null;

    if (dateTime) {
      min =
        9 >= dateTime.getMinutes()
          ? `0${dateTime.getMinutes()}`
          : `${dateTime.getMinutes()}`;

      if (!isNaN(min)) {
        return min;
      }
    }

    return "00";
  }
};

export const helperGetPrice = (amount) => {
  let price = "";

  if (amount === undefined) {
    return "";
  } else {
    price = `${amount.substring(0, 3)}: ${amount.substring(3)}`;
  }

  return price;
};

export const helperGetTravelTime = (timeValue) => {
  let hrMin, day = 0;

  if (timeValue > 0) {
    let min,
      hr = 0;

    timeValue = Number(timeValue);
    hr = timeValue / 60;

    hr = Math.floor(hr);

    hrMin = 60 * hr;

    timeValue = Number(timeValue);
    hr = Number(hr);

    min = Number(timeValue) - Number(hrMin);

    hr = hr < 10 ? `0${hr}` : hr;
    min = min < 10 ? `0${min}` : min;

    let timeFare = day > 0 ? `${day} D` : "";

    timeFare += `${hr} hr ${min} min`;

    return timeFare;
  }
};

export const helperGetFullDateFormat = (dateTime) => {
  let localDate = null;
  let day,
    month,
    year = "";

  if (dateTime === undefined) {
    localDate = new Date();
  } else {
    localDate = new Date(dateTime);
  }

  day = GET_DAYES[localDate.getDay()].substring(0, 3);
  month = GET_MONTHS[localDate.getMonth()].substring(0, 3);
  year = localDate.getFullYear().toString().substring(2);

  return `${day}, ${localDate.getDate()} ${month} ${year}`;
};

export const helperIsNumberString = (stVal)=>{
  return /^\d+$/.test(stVal);
}