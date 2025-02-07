import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PopUpComponent from "../components/PopUpComponent";
import { useAuth0 } from "@auth0/auth0-react";
import useEmployeeManager from "../hooks/useEmployeeManager";

ModuleRegistry.registerModules([AllCommunityModule]);

const EmployeeTable = ({ department = [], employees = [] }) => {
  const [show, setShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { getAccessTokenSilently ,isAuthenticated} = useAuth0();
  const { handleDelete, handleCreateOrUpdate } = useEmployeeManager();

  
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

const onEdit = (employee) => {
  setSelectedEmployee(employee);
  setShow(true);
};

const handleAdd = () => {
  setSelectedEmployee(null);
  setShow(true);
};

  const defaultColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    filter: true,
  };

  const colDefs = [
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
      {
        field: "departmentId", // Field from employee data
        headerName: "Department",
   
        cellEditorParams: {
          values: department.map((dept) => dept._id), // Provide department IDs for selection
        },
        valueGetter: (params) => {
          // Get the department object based on departmentId
          const dept = department.find((d) => d._id === params.data.departmentId);
          return dept ? dept.name : "Not Assigned"; // Show department name or fallback
        },
        valueSetter: (params) => {
          params.data.departmentId = params.newValue;
          return true;
        },     
    },
    {
      field: "isActive",
      headerName: "Is Active",
      cellRenderer: (params) => (params.value ? "Yes" : "No"),
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div>
          <IconButton
            color="success"
            onClick={() => {
              onEdit(params.data) 
            }}
            style={{ marginRight: "5px" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this employee?")
              ) {
                handleDelete(params.data._id)
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={employees}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          animateRows={true}
          theme="alpine"

          overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading...</span>`}
          overlayNoRowsTemplate={`<span class="ag-overlay-no-rows-center">No data available</span>`}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", margin: 10 }}>
        <IconButton color="primary" size="large" onClick={handleAdd}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>

      <PopUpComponent
        show={show}
        setShow={setShow}
        selectedEmployee={selectedEmployee}
        onSave={handleCreateOrUpdate}
        department={department}
      />
    </>
  );
};

export default EmployeeTable;
