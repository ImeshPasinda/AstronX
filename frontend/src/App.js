import React, { useState, useEffect } from 'react';
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import Login from './components/authentication/login';
import Register from './components/authentication/register';
import { NAVIGATE_TO_APOD, NAVIGATE_TO_EMRI, NAVIGATE_TO_INVALID_ROUTES, NAVIGATE_TO_LOGIN, NAVIGATE_TO_PROFILE, NAVIGATE_TO_REGISTER, NAVIGATE_TO_TES } from "./constant/routeConstant.js";
import Error from "./components/404/error";
import Profile from "./components/profile/profile";
import { isUserLoggedIn } from './utils/utility.js';
import ApodViewer from './components/page/apodViewer.js';
import MarsRoverExplorer from './components/page/marsRoverExplorer.js';
import EarthObservationTracker from './components/page/earthObservationTracker.js';

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = isUserLoggedIn();
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Open Routes */}
        <Route path='/' element={<Home />} />
        <Route path={NAVIGATE_TO_LOGIN} element={<Login />} />
        <Route path={NAVIGATE_TO_REGISTER} element={<Register />} />
        <Route path={NAVIGATE_TO_APOD} element={<ApodViewer />} />
        <Route path={NAVIGATE_TO_EMRI} element={<MarsRoverExplorer />} />
        <Route path={NAVIGATE_TO_TES} element={<EarthObservationTracker />} />
        <Route path={NAVIGATE_TO_INVALID_ROUTES} element={<Error />} />

        {/* Authorized Routes */}
        <Route
          path={NAVIGATE_TO_PROFILE}
          element={isLoggedIn ? <Profile /> : <Error />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

