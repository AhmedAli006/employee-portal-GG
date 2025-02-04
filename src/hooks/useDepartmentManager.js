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
  }, []); 

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