import { combineReducers, configureStore } from "@reduxjs/toolkit";
import EmployeesSlice from "../features/EmployeeSlice"; 
import DepartmentsSlice from "../features/DepartmentSlice"; 

const rootReducer = combineReducers({
  employees: EmployeesSlice,
  department: DepartmentsSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const dispatch = store ? store.dispatch : undefined;


export { store };
