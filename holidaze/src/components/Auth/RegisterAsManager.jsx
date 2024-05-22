import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../../services/api/auth';

const RegisterAsManager = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: username,
            email,
            password,
            venueManager: true
        };
        try {
            await registerUser(user);
            const loginResponse = await loginUser({ email, password });
            localStorage.setItem('username', loginResponse.data.name); 
            localStorage.setItem('token', loginResponse.data.accessToken); 
            localStorage.setItem('apiKey', loginResponse.apiKey); 
            localStorage.setItem('venueManager', loginResponse.data.venueManager);
            navigate('/manager-dashboard');
            console.log(loginResponse)
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-form">
            <h2>Register as Manager</h2>
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

export default RegisterAsManager;
