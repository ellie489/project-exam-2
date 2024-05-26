import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import Homepage from '../../pages/Home';
import LoginOrRegister from '../Auth/LoginOrRegister';
import RegisterAsManager from '../Auth/RegisterAsManager';
import NotFound from '../../pages/NotFound';
import Profile from '../Profile/index';
import EditProfile from '../Profile/EditProfile';
import BookingDetails from '../Booking/Details';
import BookingSuccess from '../Booking/Success';
import MyBookings from '../Customer/MyBookings';
import CreateVenue from '../Manager/CreateVenue';
import MyVenues from '../Manager/MyVenues';
import EditVenue from '../Manager/EditVenue';
import ManagerVenueDetails from '../Manager/VenueDetails';
import CustomerVenueDetails from '../Customer/VenueDetails';
import CreateVenueSuccess from '../Manager/CreateVenueSuccess';
import AboutPage from '../../pages/About'
const App = () => {
  return (
      <div><Layout>
          <div className="container mt-3">
              <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/about" element={<AboutPage />} /> 
                  <Route path="/login-or-register" element={<LoginOrRegister />} />
                  <Route path="/register-manager" element={<RegisterAsManager />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/venues/manager/:id" element={<ManagerVenueDetails />} />
                  <Route path="/venues/customer/:id" element={<CustomerVenueDetails />} />
                  <Route path="/booking-success/:id" element={<BookingSuccess />} />
                  <Route path="/bookings/:id" element={<BookingDetails />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/my-venues" element={<MyVenues />} />
                  <Route path="/create-venue" element={<CreateVenue />} /> 
                  <Route path="/create-venue-success/:id" element={<CreateVenueSuccess />} />
                  <Route path="/edit-venue/:id" element={<EditVenue />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
      </Layout></div>
  );
};

export default App;