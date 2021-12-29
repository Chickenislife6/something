import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PriceDisplay } from "./Price"

interface Props {
  text: string
}
const App: React.FC = () => {
  return <div>
    <input></input>
    <PriceDisplay />
  </div>
}

export default App;
