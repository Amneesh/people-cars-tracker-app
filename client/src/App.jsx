import React from 'react';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import PersonPage from './pages/PersonPage';


function App() {

  return (
   <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/people/:id" element={<PersonPage />} />
   </Routes>
  )
}

export default App
