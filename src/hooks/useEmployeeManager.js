import { useState, useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../config/API/Api";

const useEmployeeManager = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [employees, setEmployees] = useState([]);
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

  const fetchEmployees = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await API.get("Employee/get-all-employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to fetch employees!",
        severity: "error",
      });
      console.error("Error fetching employee records:", error);
    }
  }, []); 
  
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAddOrUpdate = useCallback(
    async (employee, isUpdate) => {
      try {
        const token = localStorage.getItem("access_token");
        if (isUpdate) {
          await API.put(`Employee/update-employee/?id=${employee._id}`, employee, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSnackbar({ open: true, message: "Employee updated!", severity: "success" });
        } else {
          await API.post("Employee/create-employee", employee, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSnackbar({ open: true, message: "Employee added!", severity: "success" });
        }
        fetchEmployees();
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to save employee!",
          severity: "error",
        });
        console.error("Error saving employee:", error);
      }
    },
    [fetchEmployees]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("access_token");
        await API.delete(`Employee/delete-employee/?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSnackbar({ open: true, message: "Employee deleted!", severity: "success" });
        fetchEmployees(); 
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to delete employee!",
          severity: "error",
        });
        console.error("Error deleting employee:", error);
      }
    },
    [fetchEmployees] 
  );

  return {
    employees,
    snackbar,
    closeSnackbar,
    fetchEmployees,
    handleAddOrUpdate,
    handleDelete,

  };
};

export default useEmployeeManager;