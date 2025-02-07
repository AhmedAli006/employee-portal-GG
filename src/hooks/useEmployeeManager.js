import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  closeSnackbar,
  setSnackbar,
} from "../features/EmployeeSlice";
import { addEmployee, getEmployee, removeEmployee, updateEmployee } from "../dispatcher/employeeDispatcher";

const useEmployeeManager = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { employees, snackbar } = useSelector((state) => state.employees);

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

  const fetchEmployees = useCallback( async () => {
   await getEmployee().then(()=>{
              dispatch(
                  setSnackbar({
                      open: true,
                      message: "Employees loaded successfully!",
                      severity: "success",
                    })
                );
            }).catch(()=>{
                dispatch(
                    setSnackbar({
                      open: true,
                      message: "Failed to fetch employees!",
                      severity: "error",
                    }));
            });
  }, [dispatch]);

  const handleCloseSnackbar = useCallback(() => {
    dispatch(closeSnackbar());
  }, [dispatch]);

  const handleDelete = useCallback(async (id) => {
   await removeEmployee(id).then(()=>{
      dispatch(
          setSnackbar({
              open: true,
              message: "Employees deleted successfully!",
              severity: "success",
            })
        ); 
        getEmployee();
    }).catch(()=>{
        dispatch(
            setSnackbar({
              open: true,
              message: "Failed to delete employees!",
              severity: "error",
            }));
    });

  }, [dispatch]);

  const handleCreateOrUpdate = useCallback(
   async  (employee, isUpdate) => {
      try {
        if (isUpdate) {
          // await dispatch(updateEmployeeData({ id: employee._id, employee }));
          await  updateEmployee({id: employee._id, employee}).then(()=>{
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Employees Updated successfully!",
                    severity: "success",
                  })
              );
              getEmployee();
          }).catch(()=>{
              dispatch(
                  setSnackbar({
                    open: true,
                    message: "Failed to update employees!",
                    severity: "error",
                  }));
          });
        } else {
          // await dispatch(createEmployeeData(employee));
          await  addEmployee(employee).then(()=>{
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Employees added successfully!",
                    severity: "success",
                  })
              );
              getEmployee();
          }).catch(()=>{
              dispatch(
                  setSnackbar({
                    open: true,
                    message: "Failed to add employees!",
                    severity: "error",
                  }));
          });
        }
        
      } catch (error) {
        console.error("Error saving employee:", error);
      }
    },
    [dispatch]
  );

  return {
    employees,
    snackbar,
    closeSnackbar: handleCloseSnackbar,
    fetchEmployees,
    handleDelete,
    handleCreateOrUpdate, // Unified function for both create & update
  };
};

export default useEmployeeManager;
