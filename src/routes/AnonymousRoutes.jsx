import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AnonymousRoute = ({ children }) => {
    const { user } = useAuth();

    if (user) {
      const dashboardPath = user.userType === "ADMIN"
            ? "/admin/dashboard"
            : user.userType === "OWNER"
            ? "/owner/dashboard"
            : "/customer/dashboard";

      return <Navigate to={dashboardPath} replace />;
    }

    return children;
};

export default AnonymousRoute;