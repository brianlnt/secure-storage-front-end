import { Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { IUserRequest } from '../models/ICredentials'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IResponse } from '../models/IResponse';

const schema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email'),
    password: z.string().min(6, 'Password is required')
})

const Login = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('')!) as boolean || false;
    const [logginUser, { data, error, isLoading, isSuccess }] = userAPI.useLoginUserMutation();
    const { register, handleSubmit, formState: form, getFieldState } = useForm<IUserRequest>({ resolver: zodResolver(schema), mode: 'onTouched' });

    const isFieldValid = (fieldName: keyof IUserRequest): boolean => getFieldState(fieldName, form).isTouched && !getFieldState(fieldName, form).invalid;

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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-10 w-auto" src="https://cdn-icons-png.freepik.com/512/1307/1307275.png" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Login to your account
            </h2>
            <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                <a href="#"
                    className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Or create a new acccount
                </a>
            </p>
        </div>
    
    
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {error && <div className="alert alert-dismissible alert-danger">
                    {'data' in error ? (error.data as IResponse<void>).message : 'An error occurred'}
                </div>}

                <form onSubmit={handleSubmit(handleLogin)} className="needs-validation" noValidate>
                    <div>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="input-group has-validation">
                            <input {...register('email')} id="email" name="email" placeholder="user@example.com" type="email"  
                            className={`form-control ' ${form.errors.email ? 'is-invalid' : ''} ${isFieldValid('email') ? 'is-valid' : ''}`} />
                            <div className="invalid-feedback">{form.errors.email?.message}</div>
                        </div>
                    </div>
    
                    <div className="mt-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group has-validation">
                            <input {...register('password')} id="password" name="password" type="password"
                            className={`form-control ' ${form.errors.password ? 'is-invalid' : ''} ${isFieldValid('password') ? 'is-valid' : ''}`} />
                            <div className="invalid-feedback">{form.errors.password?.message}</div>
                        </div>
                    </div>
    
                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember" type="checkbox" value="1" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
                        </div>
    
                        <div className="text-sm leading-5">
                            <a href="#"
                                className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
    
                    <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                <button disabled={form.isSubmitting || isLoading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    <span role="status">{(form.isSubmitting || isLoading) ? 'Loading...' : 'Login'}</span>
                </button>
              </span>
                    </div>
                </form>
    
            </div>
        </div>
    </div>
    );
}

export default Login;
