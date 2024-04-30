import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container">
        <a className="navbar-brand" style={{ fontSize: '25px'}} href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" style={{ fontSize: '25px', marginRight:'100px'}}  href="#">Home <span className="sr-only"></span></a>
            <div className="dropdown-divider"></div>
            <a className="nav-item nav-link active" style={{ fontSize: '25px', marginLeft: '100px',marginRight:'50px' }} href="#">Add UTC</a>
            <div className="dropdown-divider"></div>
            <a className="nav-item nav-link active" style={{ fontSize: '25px', marginLeft: '100px',marginRight:'50px' }} href="#">Convert Time</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
