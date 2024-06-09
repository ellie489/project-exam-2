import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../contexts/AuthContext';
import { registerUser, loginUser } from '../../services/api/auth';
import { registerSchema } from '../../services/validationSchema';
import ErrorBox from '../ErrorBox';

const RegisterCustomer = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      const loginResponse = await loginUser({ email: data.email, password: data.password });
      login(loginResponse);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email:</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input type="email" {...field} className="form-control" />}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Name:</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <input {...field} className="form-control" />}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <input type="password" {...field} className="form-control" />}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <button type="submit" className="button large primary blue mb-4">Register</button>
        </form>
        {error && <ErrorBox message={error} />}
        <p>
          Already have an account? <button className="link-button" onClick={() => navigate('/login')}>Login here</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterCustomer;