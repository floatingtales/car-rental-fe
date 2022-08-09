import React from 'react';

import './App.css';

import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';

import CarProvider from './context/globalContext';
import Home from './pages/home';
import NewBooking from './pages/newBooking';
import AllBookings from './pages/allBookings';
import BookingDisplay from './pages/bookingDisplay';
import NebulaFighterTheme from './theme';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={NebulaFighterTheme}>
        <CarProvider>
          <Router>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="bookings">
                <Route path="" element={<AllBookings />} />
                <Route path=":bookingId" element={<BookingDisplay />} />
              </Route>
              <Route path="book">
                <Route path=":carId" element={<NewBooking />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </CarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
