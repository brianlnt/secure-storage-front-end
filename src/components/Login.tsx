import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { IUserRequest } from '../models/ICredentials';

const Login = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('')!) as boolean || false;
    const [logginUser, { data, error, isLoading, isSuccess }] = userAPI.useLoginUserMutation();

    const handleLogin = (credentials: IUserRequest) => logginUser(credentials);

    if(isLoggedIn){
        return location?.state?.from?.pathname ? <Navigate to={location.state.from.pathname} replace /> : <Navigate to={'/'} replace />;
    }

    if(isSuccess && (!data?.data.user.mfa)){
        localStorage.setItem('login', 'true');
        return location?.state?.from?.pathname ? <Navigate to={location.state.from.pathname} replace /> : <Navigate to={'/'} replace />;
    }

    if(isSuccess && data?.data.user.mfa){
        //jsx
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
            <h3 className="mb-3 text-center">Login</h3>
            <div className="alert alert-danger" role="alert">
              An error occurred
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <a href="#" className="text-decoration-none">
                Create an Account
              </a>
              <a href="#" className="text-decoration-none">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      );
}

export default Login;
