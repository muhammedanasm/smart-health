import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ShiftScreen from "../components/shift/ShiftScreen";

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="/"
            element={
              <AuthLayout>
                <ShiftScreen />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
