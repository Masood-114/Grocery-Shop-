import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/loadUser",
  async (userData, { rejectWithValue }) => {
    try {
      const check = await fetch(
        `http://localhost:3000/registerUser?email=${userData.email}`
      );
      const existing = await check.json();
      if (existing.length > 0) {
        return rejectWithValue("Email already registered");
      }

      const response = await fetch("http://localhost:3000/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue("Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      if (
        credentials.email === "admin@gmail.com" &&
        credentials.password === "12345"
      ) {
        return { email: credentials.email, role: "admin" };
      }
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }
      return user;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { logOut } = userSlice.actions;
export default userSlice.reducer;
