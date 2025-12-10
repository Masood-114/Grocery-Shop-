import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("fetchProducts", error);
    }
  }
);

export const updateProductAndSave = createAsyncThunk(
  "products/updateProductAndSave",
  async (updateProduct) => {
    console.log("updatProductSlice", updateProduct);
    try {
      const response = await fetch(
        `http://localhost:3000/products/${updateProduct.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateProduct),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteAndSave = createAsyncThunk(
  "products/deleteAndSave",
  async (id) => {
    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  list: [],
  filtered: [],
  category: [],
  loading: false,
  error: null,
  activieCategory: "All",
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fillterByCategory: (state, action) => {
      state.activieCategory = action.payload;
      if (state.activieCategory === "All") {
        state.filtered = state.list;
      } else {
        state.filtered = state.list.filter(
          (item) => item.category === action.payload
        );
      }
    },
    shopByCategory: (state) => {
      const uniqueCategory = [
        ...new Set(state.list.map((item) => item.category)),
      ];
      state.category = uniqueCategory.map((cat) => {
        const product = state.list.find((pro) => pro.category === cat);
        return { ...product, category: cat };
      });
    },
    addNewProduct: (state, action) => {
      state.list.push(action.payload);
      state.filtered.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      const filterIndex = state.filtered.findIndex(
        (p) => p.id === action.payload.id
      );
      if (filterIndex !== -1) {
        state.filtered[filterIndex] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.list.filter((p) => p.id !== action.payload.id);
      state.filtered.filter((p) => p.id !== action.payload);
    },
  },

  extraReducers: (bulder) => {
    bulder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAndSave.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter((p) => p.id !== id);
        state.filtered = state.filtered.filter((p) => p.id !== id);
      });
  },
});

export const {
  fillterByCategory,
  shopByCategory,
  deleteProduct,
  addNewProduct,
  updateProduct,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
