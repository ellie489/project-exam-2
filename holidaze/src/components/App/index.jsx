import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import Homepage from '../../pages/Home';
import LoginOrRegister from '../Auth/LoginOrRegister';
import RegisterAsManager from '../Auth/RegisterAsManager';
import CompleteProfile from '../Profile/EditProfile';
import CustomerDashboard from '../../pages/CustomerDashboard';
import ManagerDashboard from '../../pages/ManagerDashboard';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
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

const App = () => {
  return (
      <div>
          <Navbar />
          <div className="container mt-4">
              <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/login-or-register" element={<LoginOrRegister />} />
                  <Route path="/register-manager" element={<RegisterAsManager />} />
                  <Route path="/complete-profile" element={<CompleteProfile />} />
                  <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                  <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/venues/manager/:id" element={<ManagerVenueDetails />} />
                  <Route path="/venues/customer/:id" element={<CustomerVenueDetails />} />
                  <Route path="/booking-success/:id" element={<BookingSuccess />} />
                  <Route path="/bookings/:id" element={<BookingDetails />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/my-venues" element={<MyVenues />} />
                  <Route path="/create-venue" element={<CreateVenue />} /> 
                  <Route path="/edit-venue/:id" element={<EditVenue />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
      </div>
  );
};

export default App;