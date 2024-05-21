import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';

const RegisterForm = ({ onSubmit, isVenueManager }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: username,
            email,
            password,
            venueManager: isVenueManager
        };
        try {
            await onSubmit(user);
            setSuccess(true);
            setError(null);

          
            const credentials = { email, password };
            const loginResponse = await loginUser(credentials);
            localStorage.setItem('token', loginResponse.token);

           
            if (isVenueManager) {
                navigate('/manager-dashboard');
            } else {
                navigate('/customer-dashboard');
            }
        } catch (error) {
            setError(error.message);
            setSuccess(false);
        }
    };

    return (
        <div className="register-form">
            <h2>Register as {isVenueManager ? 'Manager' : 'Customer'}</h2>
            {success && <p className="text-success">Registration successful!</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isVenueManager: PropTypes.bool.isRequired,
};

export default RegisterForm;
