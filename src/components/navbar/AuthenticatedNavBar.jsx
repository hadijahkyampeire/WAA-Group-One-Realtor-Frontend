import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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

    const goToDashboard = () => {
      if(user.userType === "ADMIN") {
        navigate("/admin/dashboard")
      } else if (user.userType === "OWNER") {
        navigate("/owner/dashboard")
      } else {
        navigate("/customer/dashboard")
      }
    }

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
            <div style={{ display: "flex", gap: "2rem" }}>
              <img src={logo} width={30} height={30} alt="Honss"/>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                Honss Real Estates
              </Typography>
            </div>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <Button onClick={goToDashboard} color='white'>Go To Dashboard</Button>
              <Typography>Welcome, {user.firstName} (<span>{user.userType}</span>)</Typography>
              <Button color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
            </div>
          </Toolbar>
      </AppBar>
    );
};

export default AuthenticatedNavbar;
