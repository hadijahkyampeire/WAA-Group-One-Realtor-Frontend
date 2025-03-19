import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Box, Typography, Container } from "@mui/material";
import NavBarLayout from '../../layouts/NavBarLayout'
import { register } from '../../api/auth';

function RegisterPage() {
  const navigate = useNavigate();
  
  // Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("CUSTOMER");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      userType,
      address,
    };

    try {
      await register(userData);
      navigate("/customer/dashboard"); // Redirect after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavBarLayout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Register</Typography>

          {error && <Typography color="error">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} margin="normal" required />

            <TextField select fullWidth label="User Type" value={userType} onChange={(e) => setUserType(e.target.value)} margin="normal">
              <MenuItem value="OWNER">Owner</MenuItem>
              <MenuItem value="CUSTOMER">Customer</MenuItem>
            </TextField>

            <TextField fullWidth label="Street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} margin="normal" required />
            <TextField fullWidth label="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} margin="normal" required />
            <TextField fullWidth label="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} margin="normal" required />
            <TextField fullWidth label="Zip Code" type="number" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} margin="normal" required />
            <TextField fullWidth label="Country" value={address.country} disabled margin="normal" />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? "Registering..." : "Sign Up"}
            </Button>
          </form>
        </Box>
      </Container>
    </NavBarLayout>
  )
}

export default RegisterPage