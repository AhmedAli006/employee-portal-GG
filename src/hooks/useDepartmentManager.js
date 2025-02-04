import { useState, useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../config/API/Api";

const useEmployeeManager = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [department, setDepartment] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Save token to localStorage when authenticated
  useEffect(() => {
    const saveToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem("access_token", token);
        } catch (error) {
          console.error("Error getting access token:", error);
        }
      }
    };

    saveToken();
  }, [isAuthenticated, getAccessTokenSilently]);

//   console.log(Department)

  // Memoize fetchDepartment to avoid recreating it on every render
  const fetchDepartment = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await API.get("Department/get-all-departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartment(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to fetch Department!",
        severity: "error",
      });
      console.error("Error fetching employee records:", error);
    }
  }, []); // No dependencies, so it won't recreate unless necessary

  // Fetch Department when the component mounts or fetchDepartment changes
  useEffect(() => {
    fetchDepartment();
  }, [fetchDepartment]); // Only run when fetchDepartment changes



  return {
    department,
    snackbar,
    closeSnackbar,
    fetchDepartment,
    
    
  };
};

export default useEmployeeManager;