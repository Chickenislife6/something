import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { PriceDisplay } from "./Price"
import { WebsiteBanner } from './header';
import { ReturnToHome } from './HomeButton';

interface Props {
  text: string
}
const App: React.FC = () => {
  return (
  <Router>
    <div>
      <Routes>
        <Route path='/' element={
          <WebsiteBanner>
          </WebsiteBanner>
        }/> 
        <Route path='pool/:id' element={
          <PriceDisplay PoolContract='0x83abecf7204d5afc1bea5df734f085f2535a9976'/>
        } />
        <Route path='pool/' element={
          <div>
          <h1>please enter a contract</h1>
          <ReturnToHome/>
          </div>
        } />
      </Routes>
    </div>
  </Router>
  )}

export default App;
