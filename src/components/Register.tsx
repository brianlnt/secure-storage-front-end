import React from 'react'
import { z } from 'zod';
import { IRegisterRequest } from '../models/ICredentials';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userAPI } from '../services/UserService';
import { Link } from 'react-router-dom';
import { IResponse } from '../models/IResponse';

const schema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email address'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z.string().min(5, 'Password must be at least 5 characters'),
})

const Register = () => {

  const { register, handleSubmit, reset, formState, getFieldState } = useForm<IRegisterRequest>({
    resolver: zodResolver(schema), mode: 'onTouched'
  });

  const [registerUser, { data, error, isLoading, isSuccess }] = userAPI.useRegisterUserMutation();

  const isFieldValid = (fieldName: keyof IRegisterRequest): boolean => getFieldState(fieldName, formState).isTouched && !getFieldState(fieldName, formState).invalid;

  const handleRegister = async (registerRequest: IRegisterRequest) => await registerUser(registerRequest);

  React.useEffect(() => reset(), [isSuccess]);
    
  return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-10 w-auto" src="https://cdn-icons-png.freepik.com/512/1307/1307275.png" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Create a new account
            </h2>
            <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                <a href="#"
                    className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    <Link to="/login" style={{ textDecoration: 'none' }}>Or Login to your account</Link>
                </a>
            </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {error && <div className="alert alert-dismissible alert-danger">
                    {'data' in error ? (error.data as IResponse<void>).message! : 'An error occurred'}
                </div>}
                {isSuccess && <div className="alert alert-dismissible alert-success">
                   {data.message}
                </div>}

                <form onSubmit={handleSubmit(handleRegister)} className="needs-validation" noValidate>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium leading-5  text-gray-700">First Name</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                            <input type="text" {...register('firstName')} name='firstName' className={`form-control ' ${formState.errors.firstName ? 'is-invalid' : ''} ${isFieldValid('firstName') ? 'is-valid' : ''}`} id="firstName" placeholder="Thinh" disabled={isLoading} required />
                            <div className="invalid-feedback">{formState.errors.firstName?.message}</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="lastName" className="block text-sm font-medium leading-5  text-gray-700">Last Name</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                            <input type="text" {...register('lastName')} name='lastName' className={`form-control ' ${formState.errors.lastName ? 'is-invalid' : ''} ${isFieldValid('lastName') ? 'is-valid' : ''}`} id="lastName" placeholder="Le" disabled={isLoading} required />
                            <div className="invalid-feedback">{formState.errors.lastName?.message}</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input type="text" {...register('email')} name='email' className={`form-control ' ${formState.errors.email ? 'is-invalid' : ''} ${isFieldValid('email') ? 'is-valid' : ''}`} id="email" placeholder="Email address" disabled={isLoading} required />
                            <div className="invalid-feedback">{formState.errors.email?.message}</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group has-validation">
                            <span className="input-group-text"><i className="bi bi-key"></i></span>
                            <input type="password" {...register('password')} name='password' className={`form-control ' ${formState.errors.password ? 'is-invalid' : ''} ${isFieldValid('password') ? 'is-valid' : ''}`} placeholder="Password" disabled={isLoading} required />
                            <div className="invalid-feedback">{formState.errors.password?.message}</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                {(formState.isSubmitting || isLoading) && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                <span role="status">{(formState.isSubmitting || isLoading) ? 'Loading...' : 'Register'}</span>
                            </button>
                        </span>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Register