import React from 'react';
import Header from './components/Header';
import './App.css';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import { Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
