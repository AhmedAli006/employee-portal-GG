import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
} from "@mui/material";

const PopUpComponent = ({ show, setShow, selectedEmployee, onSave ,department}) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",  
    isActive: false,
  });
 
    useEffect(() => {
      setEmployee(selectedEmployee || { name: "", email: "", departmentId: "", isActive: false });
    }, [selectedEmployee, show]);
  
    const handleChange = (e) => {
      const {name,value} = e.target
      setEmployee({ ...employee, [name]: value });
    };

  const handleToggle = () => {
    setEmployee({ ...employee, isActive: !employee.isActive });
  };

  const handleSubmit = () => {
    if (!employee.name || !employee.email || !employee.departmentId) {
      alert("Please fill out all fields.");
      return;
    }
    onSave(employee, !!selectedEmployee);
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        {selectedEmployee ? "Edit Employee" : "Add Employee"}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          margin="normal"
        />
        <Select
         fullWidth maxWidth="sm"
            name="departmentId"
            value={employee.departmentId}
            onChange={handleChange}
          >
            {department.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        <FormControlLabel
          control={
            <Switch checked={employee.isActive} onChange={handleToggle} />
          }
          label="Active"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {selectedEmployee ? "Save Changes" : "Add Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpComponent;
