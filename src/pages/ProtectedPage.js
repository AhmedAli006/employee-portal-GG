import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedPage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <h1>Welcome to the protected page!</h1>
      ) : (
        <h1>Please log in to view this page.</h1>
      )}
    </div>
  );
};

export default ProtectedPage;
