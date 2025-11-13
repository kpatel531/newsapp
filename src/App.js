import './App.css';

import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const pageSize = 20;
  const country = "us";
  const domain = process.env.REACT_APP_DOMAIN;
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<News key="general" domain={domain} pageSize={pageSize} country={country} category="general"/>} />
        <Route path="/business" element={<News key="business" domain={domain} pageSize={pageSize} country={country} category="business"/>} />
        <Route path="/entertainment" element={<News key="entertainment" domain={domain} pageSize={pageSize} country="us" category="entertainment"/>} />
        <Route path="/health" element={<News key="health" domain={domain} pageSize={pageSize} country={country} category="health"/>} />
        <Route path="/science" element={<News key="science" domain={domain} pageSize={pageSize} country={country} category="science"/>} />
        <Route path="/sports" element={<News key="sports" domain={domain} pageSize={pageSize} country={country} category="sports"/>} />
        <Route path="/technology" element={<News key="technology" domain={domain} pageSize={pageSize} country={country} category="technology"/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
