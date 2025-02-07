import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDepartmentUrl} from "../ApiUrls/ApiUrls";
import {httpGet} from "../service/HttpService";

const initialState = {
  employees: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllDepartmentsData = createAsyncThunk(
  "getAllDepartmentsData",
  async (_, thunkAPI) => {
    try {
      const urlToGet = getDepartmentUrl();
      const response = await httpGet(urlToGet);


      if (!response) {
        console.error("API returned NULL or undefined.");
      }
      return response;
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }
);



const DepartmentsSlice = createSlice({
  name: "DepartmentsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartmentsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDepartmentsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(getAllDepartmentsData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});


export default DepartmentsSlice.reducer;
