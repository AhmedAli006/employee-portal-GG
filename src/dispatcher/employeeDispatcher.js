import { createEmployeeData, deleteEmployeeData, getAllEmployeesData, updateEmployeeData } from "../features/EmployeeSlice";
import { dispatch } from "../store/store";

export const getEmployee = async ()=>{
  let result = null; 
  try {
    result = dispatch(getAllEmployeesData()).unwrap()
   } catch (error) {
    result = null
   }
return result;
}

export const addEmployee = async (employee)=>{
    let result = null;
    try {
     result = dispatch(createEmployeeData(employee)).unwrap();
    } catch (error) {
      result = null;
}
return result;
}

export const updateEmployee = async (employee)=>{
    let result = null;
    try {
      result = dispatch(updateEmployeeData(employee)).unwrap();
    } catch (error) {
      result = null;
}
return result;
}

export const removeEmployee = async (id)=>{
    let result = null;
    try {
      result = dispatch(deleteEmployeeData(id)).unwrap();
    } catch (error) {
      result = null;
}
return result;
}