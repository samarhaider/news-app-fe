import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "@api/auth";

interface AuthState {
  // user: { id: string; email: string; name: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  // user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  loading: false,
  error: null,
};

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.accessToken);
      // localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Register Thunk
export const register = createAsyncThunk(
  "auth/register",
  async (userData: { name: string; email: string; password: string, c_password: string }, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      localStorage.setItem("token", response.accessToken);
      // localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// Logout Thunk
export const logout = createAsyncThunk("auth/logout", async () => {
  // await logoutUser();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
