import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './View/Login/Login';
import { Provider, useSelector } from 'react-redux';
import { store } from './Redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';
import Register from './View/Register/Register';
import Home from './View/Home/Home';
import RedirectView from './Component/RedirectView/RedirectView';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
      <RedirectView/>
    </Provider>
  );
}


export default App;
