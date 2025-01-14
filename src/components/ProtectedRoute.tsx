import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('login')!) as boolean || false;

    if (isLoggedIn) {
        return <Outlet />;
    } else {
        // Toast notification
        return <Navigate to={'/login'} replace state={{ from: location }} />
    }
}

export default ProtectedRoute;