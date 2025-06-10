import './App.css';

import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const pageSize = 20;
  const country = "us";
  const apiKey = process.env.REACT_APP_NEWS_API;
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<News key="general" apiKey={apiKey} pageSize={pageSize} country={country} category="general"/>} />
        <Route path="/business" element={<News key="business" apiKey={apiKey} pageSize={pageSize} country={country} category="business"/>} />
        <Route path="/entertainment" element={<News key="entertainment" apiKey={apiKey} pageSize={pageSize} country="us" category="entertainment"/>} />
        <Route path="/health" element={<News key="health" apiKey={apiKey} pageSize={pageSize} country={country} category="health"/>} />
        <Route path="/science" element={<News key="science" apiKey={apiKey} pageSize={pageSize} country={country} category="science"/>} />
        <Route path="/sports" element={<News key="sports" apiKey={apiKey} pageSize={pageSize} country={country} category="sports"/>} />
        <Route path="/technology" element={<News key="technology" apiKey={apiKey} pageSize={pageSize} country={country} category="technology"/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
