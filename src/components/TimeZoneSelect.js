import React from 'react';

function TimeZoneSelect({ value, onChange }) {
  return (
    <div className="col">
      <label className={`form-label ${darkMode ? 'text-light' : 'text-dark'}`} htmlFor="selectedTimeZone">Select Timezone:</label>
      <select
        className="form-select"
        id="selectedTimeZone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}

export default TimeZoneSelect;
