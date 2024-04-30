import React from 'react';

function ConversionCard({ conversion, index, handleRemoveConversion, handleSliderChange }) {
  return (
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
  );
}

export default ConversionCard;
