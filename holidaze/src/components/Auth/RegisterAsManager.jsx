import React from 'react';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../services/api';

const RegisterAsManager = () => {
    const handleRegister = async (user) => {
        await registerUser(user);
    };

    return <RegisterForm onSubmit={handleRegister} isVenueManager={true} />;
};

export default RegisterAsManager;