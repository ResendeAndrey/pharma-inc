import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './Styles/global.scss'
import { UserContextProvider } from './Context/userContext'
import history from './utils/history'
//pages
import Home from './Pages/home'

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
      <Routes history={history}>
        <Route path='/' exact={true} element={<Home />} />
        <Route path='/:id' element={<Home/>}/>
      </Routes>
      </UserContextProvider>
    </BrowserRouter>
    
   
  );
}

export default App;
