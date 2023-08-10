import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  return props.loggedIn ? props.children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
