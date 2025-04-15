import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Selectors/auth.selector";

export default function GuestRoute({ children }) {
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser) {
    return <Navigate to="/posts" replace />;
  }

  return children;
}
