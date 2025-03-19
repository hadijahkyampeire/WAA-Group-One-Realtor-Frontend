import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignInPage from "../pages/auth/SignInPage";
import PropertyDetailsPage from "../pages/properties/PropertyDetails";
import CreateProperty from "../pages/properties/CreateProperty";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import UnAuthorized from "../pages/UnAuthorized";
import ProtectedRoute from "./protectedRoutes";
import RegisterPage from "../pages/auth/RegisterPage";
import AnonymousRoute from "./AnonymousRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AnonymousRoute><LandingPage /></AnonymousRoute>} />
      <Route path="/signin" element={<AnonymousRoute><SignInPage /></AnonymousRoute>} />
      <Route path="/register" element={<AnonymousRoute><RegisterPage /></AnonymousRoute>}/>
      <Route path="/properties/:id" element={<AnonymousRoute><PropertyDetailsPage /></AnonymousRoute>} />
      <Route 
        path="/properties/create" 
        element={
          <ProtectedRoute allowedRoles={['OWNER']}>
            <CreateProperty />
          </ProtectedRoute>} 
      />
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route 
          path="/admin/dashboard" 
          element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
              </ProtectedRoute>
          } 
      />
                  
      <Route 
          path="/customer/dashboard" 
          element={
              <ProtectedRoute allowedRoles={['CUSTOMER']}>
                  <CustomerDashboard />
              </ProtectedRoute>
          } 
      />

      <Route 
          path="/owner/dashboard" 
          element={
              <ProtectedRoute allowedRoles={['OWNER']}>
                  <OwnerDashboard />
              </ProtectedRoute>
          } 
      />
    </Routes>
  );
};

export default AppRoutes;
