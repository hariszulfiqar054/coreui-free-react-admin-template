import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <>
      {user ? (
        <Route component={Component} {...rest} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  );
}

export default ProtectedRoute;
