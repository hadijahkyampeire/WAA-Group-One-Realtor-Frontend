import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return allowedRoles.includes(user.userType) ? children : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
