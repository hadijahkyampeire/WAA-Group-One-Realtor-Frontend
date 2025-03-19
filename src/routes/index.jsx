import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignInPage from "../pages/SignInPage";
import PropertyDetails from "../pages/PropertyDetails";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate path="/properties" replace />} />
        <Route path="/properties" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
