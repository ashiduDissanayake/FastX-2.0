import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render public content (e.g., login page) with PublicNavbar and PublicFooter
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PublicRoute;
