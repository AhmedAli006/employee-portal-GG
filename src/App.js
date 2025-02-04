import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Home from "./pages/Home";

import Profile from "./pages/Profile";
import EmployeeRecordPage from "./pages/EmployeeRecordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthButtons from "./components/AuthButtons";
import authConfig from "./auth_config.json";

const App = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
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
      <Router>
        {/* Navigation Bar */}
        <AppBar position="static">
          <Toolbar>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/api"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              API Page
            </Button>
            <Button
              component={RouterLink}
              to="/profile"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Profile
            </Button>
            <Button
              component={RouterLink}
              to="/emp"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Employees
            </Button>
            <div style={{ marginLeft: "auto" }}>
              <AuthButtons />
            </div>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/emp" element={<ProtectedRoute component={ <EmployeeRecordPage /> } />} />
            <Route path="/profile" element={<ProtectedRoute component={<Profile />} />} />
          </Routes>
        </Container>
      </Router>
    </Auth0Provider>
  );
};

export default App;
