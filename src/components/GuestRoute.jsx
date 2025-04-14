import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuestRoute({ children }) {
  const currentUser = useSelector((state) => state.auth.currentUser);

  if (currentUser) {
    return <Navigate to="/posts" replace />;
  }

  return children;
}
