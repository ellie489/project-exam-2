import React from 'react';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../services/api';

const RegisterAsCustomer = () => {
    const handleRegister = async (user) => {
        await registerUser(user);
    };

    return <RegisterForm onSubmit={handleRegister} isVenueManager={false} />;
};

export default RegisterAsCustomer;