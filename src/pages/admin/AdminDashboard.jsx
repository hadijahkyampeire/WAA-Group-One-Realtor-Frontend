import React from "react";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import { Admin } from "./Admin";

function AdminDashboard() {
  return (
    <AuthenticatedLayout>
      <Admin />
    </AuthenticatedLayout>
  );
}

export default AdminDashboard;
