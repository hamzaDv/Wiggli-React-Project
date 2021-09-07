import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const accessToken = localStorage.getItem("accessToken");
  
  console.log("this", isAuthenticated);
  console.log("accessToken", accessToken);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/Login" />
      }
    />
  );
}

export default ProtectedRoute;