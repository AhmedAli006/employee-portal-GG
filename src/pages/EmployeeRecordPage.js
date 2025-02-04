import React, { useEffect } from "react";
import EmployeeTable from "../components/EmployeeTable";
import useEmployeeManager from "../hooks/useEmployeeManager";
import useDepartmentManager from "../hooks/useDepartmentManager";
import { Snackbar, Alert } from "@mui/material";


const EmployeeRecordPage = () => {


  const { employees, snackbar, closeSnackbar, fetchEmployees, handleAddOrUpdate, handleDelete,} =
    useEmployeeManager();
const {department}=useDepartmentManager()

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div>
      <EmployeeTable
        employees={employees}
        department={department}
        onAddOrUpdate={handleAddOrUpdate}
        onDelete={handleDelete}
      
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EmployeeRecordPage;
