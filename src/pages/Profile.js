import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarComponent from "../components/NavBarComponent";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;
  console.log(user)

  return (
    <div>
            <NavbarComponent/>
      <h2 className="text-xl font-bold">{user?.name}</h2>
      <p>{user?.email}</p>
      <img
        src={user?.picture}
        alt={user?.name}
        className="mt-4 w-32 h-32 rounded-full shadow-lg"
      />
    </div>
  );
};

export default Profile;
