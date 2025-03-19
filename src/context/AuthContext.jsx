import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlices';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    dispatch(logout());
                }
            } catch (error) {
                console.error(error)
                dispatch(logout());
            }
        }
    }, [token, dispatch]);

    return <AuthContext.Provider value={{ user, token }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
