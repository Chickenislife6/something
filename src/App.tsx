import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { PriceDisplay } from "./Price"
import { Home } from './header';

const App: React.FC = () => {
  return (
  <Router>
    <div>
      <Routes>
        <Route path='/' element={
          <Home />
        }/> 
        <Route path='pool/:id' element={
          <PriceDisplay PoolContract='0x83abecf7204d5afc1bea5df734f085f2535a9976'/>
        } />
      </Routes>
    </div>
  </Router>
  )}

export default App;
