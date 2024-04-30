import React from 'react';
import Navbar from './components/Navbar';
import Converter from './components/Converter';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Converter />
    </div>
  );
}

export default App;
