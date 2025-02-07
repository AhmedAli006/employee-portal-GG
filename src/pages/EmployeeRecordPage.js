import React from "react";
import EmployeeTable from "../components/EmployeeTable";
import useEmployeeManager from "../hooks/useEmployeeManager";
import useDepartmentManager from "../hooks/useDepartmentManager";
import { Snackbar, Alert } from "@mui/material";
import NavbarComponent from "../components/NavBarComponent";
import LoaderComponent from "../components/LoaderComponent";

const EmployeeRecordPage = () => {
  const { employees, snackbar, isLoading, closeSnackbar } = useEmployeeManager();
  const { departments } = useDepartmentManager();

  return (
    <>
    {isLoading ? 
    <LoaderComponent loading={isLoading}/>
  :
  (
<>
    <NavbarComponent/>
    <EmployeeTable employees={employees} department={departments} />
    <Snackbar
    open={snackbar.open}
    autoHideDuration={3000}
    onClose={closeSnackbar}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
</>
      )
      }
    </>
  );
};

export default EmployeeRecordPage;
