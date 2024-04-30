import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

function TimeZoneConverter() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [conversions, setConversions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showShareableLink, setShowShareableLink] = useState(false);

  const timeZoneOffsets = {
    'Asia/Kolkata': 330,
    'America/New_York': -300,
    'America/Los_Angeles': -420,
    'Europe/London': 0,
    'Europe/Paris': 60,
    'Australia/Sydney': 600,
    'Asia/Tokyo': 540,
    'America/Chicago': -360,
    'Asia/Dubai': 240,
    'Pacific/Honolulu': -600,
  };

  const handleConvertTime = () => {
    if (!selectedDate || !selectedTime || !selectedTimeZone) {
      setErrorMessage('Please select a date, time, and timezone.');
      return;
    }

    const inputDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const utcTime = inputDateTime.getTime() - inputDateTime.getTimezoneOffset() * 60000;

    const newConversion = {
      date: selectedDate,
      time: selectedTime,
      timeZone: selectedTimeZone,
      outputTime: inputDateTime.toLocaleTimeString('en-US', { timeZone: selectedTimeZone }),
      outputDate: inputDateTime.toLocaleDateString('en-US', { timeZone: selectedTimeZone }),
      sliderValue: inputDateTime.getHours(),
      currentTime: inputDateTime,
    };

    const updatedConversions = conversions.map((conversion) => {
      const offset = timeZoneOffsets[conversion.timeZone];
      const adjustedTime = new Date(utcTime + (offset * 60 * 1000));
      return {
        ...conversion,
        outputTime: adjustedTime.toLocaleTimeString('en-US', { timeZone: conversion.timeZone }),
        outputDate: adjustedTime.toLocaleDateString('en-US', { timeZone: conversion.timeZone }),
        sliderValue: adjustedTime.getHours(),
        currentTime: adjustedTime,
      };
    });

    setConversions([...updatedConversions, newConversion]);

    setSelectedDate(newConversion.date);
    setSelectedTime(newConversion.time);
    setSelectedTimeZone(newConversion.timeZone);
    setErrorMessage('');
  };

  const handleRemoveConversion = (index) => {
    setConversions(prevConversions => prevConversions.filter((_, i) => i !== index));
  };

  const handleSliderChange = (index, value) => {
    const newConversions = [...conversions];
    const currentConversion = newConversions[index];
    const currentDateTime = new Date(`${currentConversion.date}T${currentConversion.time}`);
    const utcTime = currentDateTime.getTime() - currentDateTime.getTimezoneOffset() * 60000;
    const adjustedTime = new Date(utcTime + (value * 60 * 60 * 1000));

    newConversions[index] = {
      ...currentConversion,
      outputTime: adjustedTime.toLocaleTimeString('en-US', { timeZone: currentConversion.timeZone }),
      sliderValue: value,
      currentTime: adjustedTime,
    };

    for (let i = 0; i < newConversions.length; i++) {
      if (i !== index) {
        const { timeZone } = newConversions[i];
        const offset = timeZoneOffsets[timeZone];
        const adjustedTime = new Date(utcTime + (value * 60 * 60 * 1000) + (offset * 60 * 1000));
        newConversions[i] = {
          ...newConversions[i],
          outputTime: adjustedTime.toLocaleTimeString('en-US', { timeZone }),
          sliderValue: adjustedTime.getHours(),
          currentTime: adjustedTime,
        };
      }
    }

    setConversions(newConversions);
  };

  const handleReverseConversions = () => {
    setConversions([...conversions].reverse());
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleScheduleMeet = () => {
    if (conversions.length === 0) {
      window.alert('Please select a date, time, and timezone before scheduling a meeting.');
      return;
    }

    const meetingLink = `https://meet.google.com/new?startTime=${moment(conversions[0].currentTime).tz('UTC').format('YYYY-MM-DDTHH:mm:ss')}`;
    window.open(meetingLink, '_blank');
  };

  const handleCopyShareableLink = () => {
    if (!selectedDate || !selectedTime || !selectedTimeZone) {
        window.alert('Please select a date, time, and timezone before copying the shareable link.');
        return;
    }

    const shareableUrl = getShareableLink();
    navigator.clipboard.writeText(shareableUrl);
    setShowShareableLink(false);
};

  const getShareableLink = () => {
      const timezoneParams = conversions.map((tz) => `${tz.timeZone}:${tz.currentTime}`).join(',');
      const shareableUrl = `${window.location.origin}?date=${selectedDate}&time=${selectedTime}&timezones=${timezoneParams}`;
      return shareableUrl;
  };

  const getUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get('date');
      const timeParam = params.get('time');
      const timezoneParams = params.get('timezones');
      return { dateParam, timeParam, timezoneParams };
  };

  useEffect(() => {
    const { dateParam, timeParam, timezoneParams } = getUrlParams();
    if (dateParam && timeParam && timezoneParams) {
      setSelectedDate(dateParam);
      setSelectedTime(timeParam);
      const timezoneArray = timezoneParams.split(',');
      const newConversions = timezoneArray.map((timezone) => {
        const [timeZone, currentTime] = timezone.split(':');
        const inputDateTime = new Date(currentTime);
        const utcTime = inputDateTime.getTime() - inputDateTime.getTimezoneOffset() * 60000;
        const offset = timeZoneOffsets[timeZone];
        const adjustedTime = new Date(utcTime + (offset * 60 * 1000));
        const sliderValue = adjustedTime.getHours(); // Calculate slider value based on adjusted time
        return {
          timeZone,
          currentTime: adjustedTime,
          outputTime: adjustedTime.toLocaleTimeString('en-US', { timeZone }),
          outputDate: adjustedTime.toLocaleDateString('en-US', { timeZone }),
          sliderValue, // Set slider value
        };
      });
      setConversions(newConversions);
    }
  }, []);


  useEffect(() => {
    const shareableUrl = getShareableLink();
    const { dateParam, timeParam } = getUrlParams();
    window.history.replaceState(null, null, `${shareableUrl}&date=${dateParam}&time=${timeParam}`);
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (darkMode) {
      body.style.backgroundColor = '#222'; // Dark background color
    } else {
      body.style.backgroundColor = '#fff'; // Light background color
    }
  }, [darkMode]);

  return (
    <div className={`container mt-5 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <h2 className={`mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>Time Zone Converter</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="row mb-3">
            <div className="col">
              <label className={`form-label ${darkMode ? 'text-light' : 'text-dark'}`} htmlFor="selectedDate">Select Date:</label>
              <input
                className="form-control"
                type="date"
                id="selectedDate"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label className={`form-label ${darkMode ? 'text-light' : 'text-dark'}`} htmlFor="selectedTime">Select Time:</label>
              <input
                className="form-control"
                type="time"
                id="selectedTime"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
            <div className="col">
              <label className={`form-label ${darkMode ? 'text-light' : 'text-dark'}`} htmlFor="selectedTimeZone">Select Timezone:</label>
              <select
                className="form-select"
                id="selectedTimeZone"
                value={selectedTimeZone}
                onChange={(e) => setSelectedTimeZone(e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="Asia/Kolkata">Indian Standard Time (IST)</option>
                <option value="America/New_York">Eastern Standard Time (EST)</option>
                <option value="America/Los_Angeles">Pacific Standard Time (PST)</option>
                <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                <option value="Europe/Paris">Central European Time (CET)</option>
                <option value="Australia/Sydney">Australian Eastern Standard Time (AEST)</option>
                <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                <option value="America/Chicago">Central Standard Time (CST)</option>
                <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
                <option value="Pacific/Honolulu">Hawaii-Aleutian Standard Time (HAST)</option>
              </select>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-4">
              <button className="btn btn-primary w-100" onClick={handleConvertTime}>Convert Time</button>
            </div>
            <div className="col-sm-4">
              <button className={`btn btn-dark-mode ${darkMode ? 'btn-dark' : 'btn-light'}`} onClick={toggleDarkMode} style={{ textDecoration: 'underline' }}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            <div className="col-sm-4">
              <button className="btn btn-secondary w-100" onClick={handleReverseConversions}>Reverse Order</button>
            </div>

          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-sm-4">
              <button className="btn btn-success w-100" onClick={handleScheduleMeet}>Schedule Meet</button>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-sm-8">
              {showShareableLink && (
                <div className="input-group">
                  <input type="text" className="form-control" value={getShareableLink()} readOnly />
                  <button className="btn btn-outline-secondary" onClick={handleCopyShareableLink}>Copy</button>
                </div>
              )}
              <button className="btn btn-outline-primary w-100 mt-2" onClick={() => setShowShareableLink(!showShareableLink)}>
                {showShareableLink ? 'Hide' : 'Get'} Shareable Link
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        {conversions.map((conversion, index) => (
          <div key={index} className="col-sm-6">
            <div className="card mb-3">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="card-title">{conversion.timeZone}</h5>
                <button className="btn btn-link" onClick={() => handleRemoveConversion(index)}>&#10006;</button>
              </div>
              <div className="card-body">
                <p><b>Updated Time:</b> {conversion.outputTime}</p>
                <p><b>Updated Date:</b> {conversion.outputDate}</p>
              </div>
              <div className="card-footer">
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={conversion.sliderValue}
                  onChange={(e) => handleSliderChange(index, e.target.value)}
                  className="w-100"
                />
                <div className="font-weight-bold text-center">{conversion.sliderValue}:00</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeZoneConverter;
