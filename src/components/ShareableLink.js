import React from 'react';

function ShareableLink({ shareableUrl, handleCopyShareableLink }) {
  return (
    <div className="row justify-content-center mt-3">
      <div className="col-sm-8">
        <div className="input-group">
          <input type="text" className="form-control" value={shareableUrl} readOnly />
          <button className="btn btn-outline-secondary" onClick={handleCopyShareableLink}>Copy</button>
        </div>
        <button className="btn btn-outline-primary w-100 mt-2" onClick={handleCopyShareableLink}>
          Copy Shareable Link
        </button>
      </div>
    </div>
  );
}

export default ShareableLink;
