import {useState, React} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import VINDecoderPage from './pages/VINDecoderPage';
import ResearchHelperPage from './pages/ResearchHelperPage';
import DecoderResultsPage from './pages/DecoderResultsPage';


function App() {
  // lift data from VIN Decoder Page
  const [vehicle_data, set_vehicle_data] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
      <nav className="nav_bar">
        <NavBar/>
      </nav>
      <Routes>
        <Route path="/" exact element = {<HomePage/>}/>
        <Route path="/decode" element = {<VINDecoderPage set_vehicle_data={set_vehicle_data}/>}/>
        <Route path="/research" element = {<ResearchHelperPage/>}/>
        <Route path="/decoderresults" element = {<DecoderResultsPage vehicle_data={vehicle_data}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
