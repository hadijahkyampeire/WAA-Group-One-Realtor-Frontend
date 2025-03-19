import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import { logout } from '../../store/slices/authSlices';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import logo from "../../assets/logo.png"

const AuthenticatedNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: theme.palette.background.primary, 
            boxShadow: "none", 
            top: 0, 
            zIndex: 1300
            }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={logo} width={30} height={30} alt="Honss"/>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                Honss Real Estates
              </Typography>
              <Typography>Welcome, {user.userType} {user.firstName} </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AuthenticatedNavbar;
