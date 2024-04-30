import moment from 'moment-timezone';

export const getShareableLink = (selectedDate, selectedTime, conversions) => {
  const timezoneParams = conversions.map((tz) => `${tz.timeZone}:${tz.currentTime}`).join(',');
  const shareableUrl = `${window.location.origin}?date=${selectedDate}&time=${selectedTime}&timezones=${timezoneParams}`;
  return shareableUrl;
};

export const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const dateParam = params.get('date');
  const timeParam = params.get('time');
  const timezoneParams = params.get('timezones');
  return { dateParam, timeParam, timezoneParams };
};
