import React from 'react';

function DateTimeInput({ label, value, onChange, type, darkMode }) {
  return (
    <div className="col">
      <label className={`form-label ${darkMode ? 'text-light' : 'text-dark'}`} htmlFor={label}>{label}:</label>
      <input
        className="form-control"
        type={type}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default DateTimeInput;
