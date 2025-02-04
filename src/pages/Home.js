import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to My React App</h1>
      {isAuthenticated && <p className="mt-4">Hello, {user?.name}</p>}
    </div>
  );
};

export default Home;
