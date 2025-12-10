import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchTestimonails = createAsyncThunk(
  "testimonail/fetchTestimonails",
  async () => {
    const response = await fetch("http://localhost:3000/professional");
    const data = await response.json();
    return data;
  }
);
const TestimonailsSlice = createSlice({
  name: "testimonail",
  initialState,
  reducers: {
    allTestimonail: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(fetchTestimonails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonails.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTestimonails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TestimonailsSlice.reducer;
