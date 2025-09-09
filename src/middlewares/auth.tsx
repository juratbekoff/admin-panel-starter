import React from "react";
import { Navigate } from "react-router";

export const AuthChecker = ({ children }: { children: React.ReactElement }) => {
  const accessToken = localStorage.getItem("token");

  if (!accessToken) {
    return <Navigate to="/auth" replace={true} />;
  }

  return <>{children}</>;
};
