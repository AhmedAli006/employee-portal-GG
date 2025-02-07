import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import EmployeeRecordPage from "../pages/EmployeeRecordPage";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

import NotFound from "../pages/NotFound";
import { getEmployee } from "../dispatcher/employeeDispatcher";
import { getDepartments } from "../dispatcher/departmentDispatcher";



const useEmployeeApp = () => {
  //loader and routes



  const employeeLoader = async () =>{
   try {
      await getEmployee()
      await getDepartments()
   } catch (error) {
    console.log(error)
   }

  }

  const loadRoutes=()=>{

      let customRoutes = [
          { 
            path: "/",
            element: <Home />,
            errorElement: <NotFound />, 
        },
        {
            path: "/emp",
            element: <ProtectedRoute component={<EmployeeRecordPage />}/>,
            loader: employeeLoader, 
            errorElement: <NotFound />, 
        },
        { 
            path: "/profile",
            element: <ProtectedRoute component={<Profile />}/>,
            errorElement: <NotFound />, 
        },
    ];
    return customRoutes;
}
return { loadRoutes }; 
};
export default useEmployeeApp;
