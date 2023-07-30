import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './View/Login/Login';
import { Provider, useSelector } from 'react-redux';
import { store,persistor  } from './Redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';
import Register from './View/Register/Register';
import Home from './View/Home/Home';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <div className="App">
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
       </PersistGate>
    </Provider>
  );
}


export default App;
