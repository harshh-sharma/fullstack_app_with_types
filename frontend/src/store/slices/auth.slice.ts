// store/slices/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axiosInstance";

// ------------------- Types -------------------

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// ------------------- Thunks -------------------

// Register
export const registerThunk = createAsyncThunk<AuthResponse, RegisterData, { rejectValue: string }>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/register", data);
      if (res.data.success) {
        return res.data.data; // Assuming backend returns { success, data: { user, token } }
      } else {
        return rejectWithValue(res.data.message || "Registration failed");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/login", data);
      console.log("res", res);

      if (res?.data?.success) {
        return res.data.data; // Success case
      } else {
        return rejectWithValue(res.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);



// ------------------- Initial State -------------------

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// ------------------- Slice -------------------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Registration failed";
    });
    builder.addCase(loginThunk.pending, (state) => {
      state.error = null;
      state.isLoggedIn  = false;
    });
   builder.addCase(loginThunk.fulfilled,(state,action) => {
    state.loading = false;
    state.isLoggedIn = true;
    state.token = action?.payload?.token;
    state.user = action?.payload?.user;
    localStorage.setItem("token",action?.payload?.token);
    localStorage.setItem("user",JSON.stringify(action?.payload?.user));
   });
   builder.addCase(loginThunk.rejected,(state,action) => {
     state.loading = false;
     console.log("action?.payload",action?.payload);
     
     state.error = action?.payload || "Login failed"
   });
  },
});


// ------------------- Exports -------------------

export const { logout } = authSlice.actions;
export default authSlice.reducer;
