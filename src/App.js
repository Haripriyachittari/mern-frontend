import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <Router>
        <GoogleOAuthProvider clientId="658250694491-1umd87rc217ho53c7cga5dbf3ico21u0.apps.googleusercontent.com">
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </GoogleOAuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
