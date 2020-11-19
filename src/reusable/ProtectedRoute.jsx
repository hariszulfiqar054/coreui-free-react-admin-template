import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...rest }) {
  const isAuth = useSelector((state) => state?.auth?.isAuth);
  return (
    <>
      {isAuth ? (
        <Route component={Component} {...rest} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  );
}

export default ProtectedRoute;
