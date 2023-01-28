import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import VINDecoderPage from './pages/VINDecoderPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>AutoDB</header>

      <nav className="nav_bar">
        <NavBar/>
      </nav>

      <Routes>
        <Route path="/" exact element = {<HomePage/>}/>
        <Route path="/decode" element = {<VINDecoderPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
