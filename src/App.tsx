import React from 'react';
import { Home, Records } from './pages';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './components';

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/records' element={<Records/>}/>
        </Routes>
        <Outlet/>
      </BrowserRouter>
  );
}

export default App;
