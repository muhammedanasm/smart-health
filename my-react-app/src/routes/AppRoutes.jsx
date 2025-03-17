import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ShiftScreen from "../components/shift/ShiftScreen";
import ShiftTable from "../components/shift table/ShiftTable";
import Blocks from "../components/blocks/Blocks";
import Room from "../components/rooms/Room";

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
                <ShiftTable />
              </AuthLayout>
            }
          />
          <Route
            path="/blocks"
            element={
              <AuthLayout>
                <Blocks />
              </AuthLayout>
            }
          />
          <Route
            path="/rooms"
            element={
              <AuthLayout>
                <Room />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
