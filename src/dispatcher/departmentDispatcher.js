import { getAllDepartmentsData } from "../features/DepartmentSlice";
import { dispatch } from "../store/store";

export const getDepartments = async ()=>{
  let result = null; 
  try {
    result = dispatch(getAllDepartmentsData()).unwrap()
} catch (error) {
    result = null
}
return result;
}
