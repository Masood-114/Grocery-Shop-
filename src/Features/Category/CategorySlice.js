import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
  filtered: [],
  category: [],
  loading: false,
  error: null,
  activieCategory: "All",
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/category");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("fetchCategory", error);
    }
  }
);
const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    shopByCategory: (state) => {
      const uniqueCategory = [
        ...new Set(state.list.map((item) => item.category)),
      ];
      state.category = uniqueCategory.map((cat) => {
        const product = state.list.find((pro) => pro.category === cat);
        return { ...product, category: cat };
      });
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { shopByCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
