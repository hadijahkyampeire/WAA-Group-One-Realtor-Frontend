import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlices';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Typography, useTheme } from '@mui/material';
import { login } from '../../api/auth';
import NavBarLayout from '../../layouts/NavBarLayout';

const SignInPage = () => {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const { data } = await login({ username: email, password })
          dispatch(loginSuccess(data));
          setLoading(false);

          if (data?.user) {
            const userType = data?.user?.userType?.toUpperCase();

            if (userType === 'ADMIN') {
                console.log("Navigating to /admin/dashboard");
                navigate('/admin/dashboard');
            } else if (userType === 'CUSTOMER') {
                console.log("Navigating to /customer/dashboard");
                navigate('/customer/dashboard');
            } else if (userType === 'OWNER') {
                console.log("Navigating to /owner/dashboard");
                navigate('/owner/dashboard');
            } else {
                console.log("Navigating to /unauthorized");
                navigate('/unauthorized');
            }
          } else {
              console.log("User data is missing, navigating to unauthorized");
              navigate('/unauthorized');
          }
      } catch(err) {
          setLoading(false);
          setError(err || "Login error")
      }
    };

    return (
        <NavBarLayout>
          <Box 
            sx={{ 
              backgroundColor: "white", 
              margin: "4rem auto", 
              borderRadius: 2, 
              boxShadow: theme.shadows[3], 
              padding: 8,
              textAlign: "center",
              width: "50%"}}>
            <form onSubmit={handleSubmit} 
              style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px', margin: 'auto' }}>
                <Typography variant="h3" gutterBottom color='primary'>Login</Typography>
                <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
            </form>
            <Typography sx={{ textAlign: "center", mt: 4 }}>Don't have an account yet? <Link to="/register">Create an Account</Link></Typography>
          </Box>
        </NavBarLayout>
    );
};

export default SignInPage;
