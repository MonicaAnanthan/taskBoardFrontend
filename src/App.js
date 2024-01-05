import React from 'react';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
