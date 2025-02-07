import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEmployeeUrl, getAllUrl, removeEmployeeUrl,updateEmployeeUrl } from "../ApiUrls/ApiUrls";
import { httpDelete, httpGet, httpPost, httpPut } from "../service/HttpService";

const initialState = {
  employees: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  snackbar: {
    open: false,
    message: "",
    severity: "success",
  },
};

export const getAllEmployeesData = createAsyncThunk(
  "getAllEmployeesData",
  async (_, thunkAPI) => {
    try {
      const urlToGet = getAllUrl();
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
export const deleteEmployeeData = createAsyncThunk(
  "deleteEmployeeData",
  async (id, thunkAPI) => {
    try {
      const urlToDelete = removeEmployeeUrl(id);
      const response = await httpDelete(urlToDelete);

      if (!response) {
        console.error("API returned NULL or undefined.");
      }

      return response;
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }
);

export const updateEmployeeData = createAsyncThunk(
  "updateEmployeeData",
  async ({ id, employee }, thunkAPI) => {
    try {
   const urlToUpdate = updateEmployeeUrl(id);
      const response = await httpPut(urlToUpdate, employee);
      if (!response) {
        console.error("API returned NULL or undefined.");
      }

      return response;
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }
);
export const createEmployeeData = createAsyncThunk(
  "createEmployeeData",
  async ( employee, thunkAPI) => {
    try {
      const urlToCreate = createEmployeeUrl(); 
      const response = await httpPost(urlToCreate, employee);
      if (!response) {
        console.error("API returned NULL or undefined.");

      }
      return response;
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }
);

const EmployeesSlice = createSlice({
  name: "EmployeesSlice",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      state.snackbar = action.payload;
    },
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployeesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEmployeesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(getAllEmployeesData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteEmployeeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployeeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(deleteEmployeeData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateEmployeeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployeeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(updateEmployeeData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createEmployeeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployeeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(createEmployeeData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setSnackbar, closeSnackbar } = EmployeesSlice.actions;
export default EmployeesSlice.reducer;
