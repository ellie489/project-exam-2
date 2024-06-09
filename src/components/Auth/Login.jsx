import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from '../../services/api/auth';
import { loginSchema } from '../../services/validationSchema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import ErrorBox from '../ErrorBox';
import styles from './index.module.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const userData = await loginUser(data);
      login(userData);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
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
            <label>Password:</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <input type="password" {...field} className="form-control" />}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <button type="submit" className="button large primary blue mb-4">Login</button>
        </form>
        {error && <ErrorBox message={error} />}
        <p>
          Don’t have an account? <button className="link-button" onClick={() => navigate('/register-customer')}>Register here</button>
        </p>
      </div>
      <div className={styles.listPropertyBox}>
        <h3 className='mb-3'>List your property <FontAwesomeIcon icon={faHouse} style={{color: "#208FBC"}} /></h3>
        <p>
          Get started by creating your account <Link to="/register-manager" className={styles.link}>here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;