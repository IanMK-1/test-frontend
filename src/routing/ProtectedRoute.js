import React from "react";
import { Route, Navigate } from "react-router-dom";
import { checkTokenValidity } from "../utils/token/validateToken";
import { paths } from "../urlPaths";
import ComponentBody from "./ComponentBody";

function ProtectedRoute({ component: Component, path, hasNavBar = true }) {
  let isTokenValidated = checkTokenValidity();

  return (
    <Route
      path={path}
      element={() => (isTokenValidated ? (
        <ComponentBody hasNavBar={hasNavBar}>
          <Component />
        </ComponentBody>
      ) : (
        <Navigate to={paths.login} />
      ))}
    />
  );
}

export default ProtectedRoute;
