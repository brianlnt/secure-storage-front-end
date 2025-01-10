import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login.tsx';
import { setupStore } from './store/store.ts';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = setupStore();
const router = createBrowserRouter(createRoutesFromElements(
  <Route path = '/' element = {<App />}>
    <Route path = 'login' element = {<Login />} />
  </Route >
));

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store = {store}>
    <RouterProvider router = {router} />
  </Provider>
)
