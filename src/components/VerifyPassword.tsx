import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { UpdateNewPassword } from '../models/ICredentials';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IResponse } from '../models/IResponse';

const schema = z.object({
    newPassword: z.string().min(5, { message: 'New password is required' }),
    confirmNewPassword: z.string().min(5, { message: 'Confirm password is required' }),
    userId: z.string().min(5, { message: 'User ID password is required' }),
  }).superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if(newPassword !== confirmNewPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmNewPassword'],
            message: 'New password and confirm password do not match'
        })
    }
  });

const VerifyPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.get('key');
    const { register, handleSubmit, reset, formState, getFieldState } = useForm<UpdateNewPassword>({ resolver: zodResolver(schema), mode: 'onTouched', defaultValues: { password: '', newPassword: '', confirmNewPassword: '' } });
    const [verifyPassword, { data, error, isLoading, isSuccess }] = userAPI.useVerifyPasswordMutation();
    const [resetpassword, {  data: resetData, error: resetError, isLoading: resetLoading, isSuccess: resetSuccess }] = userAPI.useDoResetPasswordMutation();

    const isFieldValid = (fieldName: keyof UpdateNewPassword): boolean => getFieldState(fieldName, formState).isTouched && !getFieldState(fieldName, formState).invalid;

    const handleResetPassword = async (passwordrequest: UpdateNewPassword) => {
        await resetpassword(passwordrequest);
        reset();
    }

    React.useEffect(() => {
        if (key && location.pathname.includes('/verify/password')) {
            verifyPassword(key);
        }
    }, []);

    if (!key) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '100px' }}>
                        <div className="card">
                            <div className="card-body">
                                <div className="alert alert-dismissible alert-danger">
                                    Invalid link. Please check the link and try again.
                                </div>
                                <hr className="my-3" />
                                <div className="row mb-3">
                                    <div className="col d-flex justify-content-start">
                                        <div className="btn btn-outline-light text-white bg-blue-500 hover:bg-blue-500">
                                            <Link to="/login" style={{ textDecoration: 'none' }}>Go to login</Link>
                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-end">
                                        <div className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                            <Link to="/resetpassword">Forgot your password?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (key && !isSuccess) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '100px' }}>
                        <div className="card">
                            <div className="card-body">
                                {error && <div className="alert alert-dismissible alert-danger">
                                    {'data' in error ? (error.data as IResponse<void>).message! : 'An error occurred'}
                                </div>}
                                <div className="d-flex align-items-center">
                                    {!error && <><strong role="status">Please wait. Verifying...</strong>
                                        <div className="spinner-border ms-auto" aria-hidden="true"></div></>}
                                </div>
                                {error && <>
                                    <hr className="my-3" />
                                    <div className="row mb-3">
                                        <div className="col d-flex justify-content-start">
                                            <div className="btn btn-outline-light text-white bg-blue-500 hover:bg-blue-500">
                                                <Link to="/login" style={{ textDecoration: 'none' }}>Go to login</Link>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-end">
                                            <div className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                                <Link to="/resetpassword">Forgot your password?</Link>
                                            </div>
                                        </div>
                                    </div></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isSuccess && location.pathname.includes('/verify/password')) {
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
                {resetError && <div className="alert alert-dismissible alert-danger">
                    {'data' in resetError ? (resetError.data as IResponse<void>).message! : 'An error occurred'}
                </div>}
                {resetSuccess && <div className="alert alert-dismissible alert-success">
                    {resetData.message}
                </div>}
                
                <form onSubmit={handleSubmit(handleResetPassword)} className="needs-validation" noValidate>
                    <input type="hidden" {...register('userId')} defaultValue={data.data.user.userId} name='userId' id="userId" required />
                    <div>
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input type="password" {...register('newPassword')} name='newPassword' className={`form-control ' ${formState.errors.newPassword ? 'is-invalid' : ''} ${isFieldValid('newPassword') ? 'is-valid' : ''}`} id="newPassword" placeholder="New password" disabled={isLoading} required />
                            <div className="invalid-feedback">{formState.errors?.newPassword?.message}</div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input type="password" {...register('confirmNewPassword')} name='confirmNewPassword' className={`form-control ' ${formState.errors.confirmNewPassword ? 'is-invalid' : ''} ${isFieldValid('confirmNewPassword') ? 'is-valid' : ''}`} id="confirmNewPassword" placeholder="Confirm new password" disabled={isLoading} required />
                            <div className="invalid-feedback">{formState.errors?.confirmNewPassword?.message}</div>
                        </div>
                    </div>
    
                    <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm leading-5">
                            <a href="#"
                                className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                <Link to="/login" style={{ textDecoration: 'none' }}>Create an Account</Link>
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
                                <span role="status">{(formState.isSubmitting || isLoading) ? 'Loading...' : 'Update'}</span>
                            </button>
                        </span>
                    </div>
                </form>
    
            </div>
        </div>
    </div>
        )
    }
}

export default VerifyPassword;