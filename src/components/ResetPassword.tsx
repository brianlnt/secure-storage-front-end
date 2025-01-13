import { Link, Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { EmailAddress } from '../models/ICredentials';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IResponse } from '../models/IResponse';

const schema = z.object({ email: z.string().min(3, 'Email is required').email('Invalid email address') });

const ResetPassword = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('login')!) as boolean || false;
    const { register, handleSubmit, formState, getFieldState } = useForm<EmailAddress>({ resolver: zodResolver(schema), mode: 'onTouched' });
    const [resetPassword, { data, error, isLoading, isSuccess }] = userAPI.useResetPasswordMutation();

    const isFieldValid = (fieldName: keyof EmailAddress): boolean => getFieldState(fieldName, formState).isTouched && !getFieldState(fieldName, formState).invalid;

    const handleResetPassword = async (email: EmailAddress) => await resetPassword(email);

    if (isLoggedIn) {
        return location?.state?.from?.pathname ? <Navigate to={location?.state?.from?.pathname} replace /> : <Navigate to={'/'} replace />
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-10 w-auto" src="https://cdn-icons-png.freepik.com/512/1307/1307275.png" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Reset Your Password
            </h2>
        </div>
    
    
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {error && <div className="alert alert-dismissible alert-danger">
                    {'data' in error ? (error.data as IResponse<void>).message! : 'An error occurred'}
                </div>}
                {isSuccess && <div className="alert alert-dismissible alert-success">
                    {data.message}
                </div>}
                
                <form onSubmit={handleSubmit(handleResetPassword)} className="needs-validation" noValidate>
                    <div>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input {...register('email')} id="email" name="email" placeholder="user@example.com" type="email"  
                            className={`form-control ' ${formState.errors.email ? 'is-invalid' : ''} ${isFieldValid('email') ? 'is-valid' : ''}`} />
                            <div className="invalid-feedback">{formState.errors.email?.message}</div>
                        </div>
                    </div>
    
                    <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm leading-5">
                            <a href="#"
                                className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                <Link to="/register" style={{ textDecoration: 'none' }}>Create an Account</Link>
                            </a>
                        </div>
    
                        <div className="text-sm leading-5">
                            <a href="#"
                                className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                <Link to="/login" style={{ textDecoration: 'none' }}>Have an account? Login</Link>
                            </a>
                        </div>
                    </div>
    
                    <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                            <button disabled={formState.isSubmitting || isLoading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                {(formState.isSubmitting || isLoading) && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                <span role="status">{(formState.isSubmitting || isLoading) ? 'Loading...' : 'Reset'}</span>
                            </button>
                        </span>
                    </div>
                </form>
    
            </div>
        </div>
    </div>
    )
}

export default ResetPassword;