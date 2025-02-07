import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { getDepartments } from "../dispatcher/departmentDispatcher";

const useDepartmentManager = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [departments, setDepartments] = useState([]);


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
      const data = await getDepartments(); // Fetch data
     
      if (Array.isArray(data)) {
        setDepartments(data); // Store it in state
      } else {
        console.error("Invalid department data:", data);
        setDepartments([]);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      
    } 
  }, []);

  useEffect(() => {
    fetchDepartment(); 
  }, [fetchDepartment]);

  return { departments, fetchDepartment};
};

export default useDepartmentManager;
