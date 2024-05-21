import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import RegisterAsCustomer from '../Auth/RegisterAsCustomer';
import RegisterAsManager from '../Auth/RegisterAsManager';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register-customer" element={<RegisterAsCustomer />} />
                    <Route path="/register-manager" element={<RegisterAsManager />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;