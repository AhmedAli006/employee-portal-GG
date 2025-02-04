import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(() => component);
  return <Component />;
};

export default ProtectedRoute;
