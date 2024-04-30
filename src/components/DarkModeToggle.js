import React from 'react';

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <div className="col-sm-4">
      <button className={`btn btn-dark-mode ${darkMode ? 'btn-dark' : 'btn-light'}`} onClick={toggleDarkMode} style={{ textDecoration: 'underline' }}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default DarkModeToggle;
