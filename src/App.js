import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Home from "./pages/Home";

import Profile from "./pages/Profile";
import EmployeeRecordPage from "./pages/EmployeeRecordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthButtons from "./components/AuthButtons";
import authConfig from "./auth_config.json";
import useEmployeeApp from "./hooks/UseEmployeeApp";
import NavbarComponent from "./components/NavBarComponent";

const App = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [router, setRouter] = useState(null);
  
  useEffect(() => {
    const saveToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          // console.log("Session Access Token:", token);

          localStorage.setItem("access_token", token);
        } catch (error) {
          console.error("Error getting access token:", error);
        }
      }
    };

    saveToken();
  }, [isAuthenticated, getAccessTokenSilently]);
  const { loadRoutes } = useEmployeeApp();
  useEffect(()=>{
    const routes = loadRoutes(); 
    const routerDefinations = createBrowserRouter(routes);
    setRouter(routerDefinations);
  },[])
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      audience={authConfig.audience}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://localhost:7039/",
      }}
    > 
      {router && <RouterProvider router={router} />}
    </Auth0Provider>
  );
};

export default App;
