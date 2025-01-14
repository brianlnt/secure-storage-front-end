import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login.tsx';
import { setupStore } from './store/store.ts';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar.tsx';
import Documents from './components/document/Documents.tsx';
import Register from './components/Register.tsx';
import VerifyAccount from './components/VerifyAccount.tsx';
import ResetPassword from './components/ResetPassword.tsx';
import VerifyPassword from './components/VerifyPassword.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Restricted from './components/Restricted.tsx';

const store = setupStore();
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element = {<App />}>
    <Route path='login' element = {<Login />} />
    <Route path='register' element={<Register />} />
    <Route path='user/verify/account' element={<VerifyAccount />} />
    <Route path='user/verify/password' element={<VerifyPassword />} />
    <Route path='resetpassword' element={<ResetPassword />} />
    <Route element={<ProtectedRoute />} >
      <Route element={<NavBar />}>
        <Route index path='/documents' element={<Documents />} />
        <Route path='/' element={<Navigate to={'/documents'} />} />
        <Route element={<Restricted />} >
          <Route path='users' element={null} />
        </Route>
      </Route>
    </Route>
  </Route >
));

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store = {store}>
    <RouterProvider router = {router} />
  </Provider>
)
