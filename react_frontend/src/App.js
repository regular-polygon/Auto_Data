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
import ManufacturersPage from './pages/ManufacturersPage';
import VehicleComparisonPage from './pages/VehicleComparisonPage';

function App() {
  // lift data from VIN Decoder Page
  const [vehicle_data, set_vehicle_data] = useState({});
  const [recall_data, set_recall_data] = useState(null);
  // record the three most recent VIN lookups
  const [search_history, set_search_history] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
      <Routes>
        <Route path="/" exact element = {<HomePage/>}/>
        <Route path="/decode" element = {<VINDecoderPage set_vehicle_data={set_vehicle_data} set_recall_data={set_recall_data} search_history={search_history} set_search_history={set_search_history}/>}/>
        <Route path="/research" element = {<ResearchHelperPage set_vehicle_data={set_vehicle_data}/>}/>
        <Route path="/decoderresults" element = {<DecoderResultsPage vehicle_data={vehicle_data} recall_data={recall_data}/>}/>
        <Route path="/research/manufacturers" element = {<ManufacturersPage />}/>
        <Route path="/research/comparevehicles" element = {<VehicleComparisonPage vehicle_data={vehicle_data} set_vehicle_data={set_vehicle_data}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
