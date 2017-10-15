import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Transactions from './components/transactions';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="Top-header"> </header>
        <header className="App-header">
         My Transactions
        </header>
        <p className="App-intro">
      <Transactions />
        </p>
      </div>
    );
  }
}

export default App;
