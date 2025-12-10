import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadInvoice = createAsyncThunk("invoice/loadInvoice", async () => {
  try {
    const response = await fetch("http://localhost:3000/invoice");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Invoice error", error);
  }
});

export const saveInvoice = createAsyncThunk(
  "invoice/saveInvoice",
  async ({ cart, total, status }) => {
    if (!cart?.items?.length) return null;

    try {
      const response = await fetch("http://localhost:3000/invoice", {
        method: "POST",
        body: JSON.stringify({
          cart,
          total,
          status,
          date: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Invoice error", error);
    }
  }
);

const initialState = {
  state: [],
  error: null,
  loading: false,
};
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    clearInvoice: (state) => {
      (state.invoice = null), (state.error = null), (state.loading = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(loadInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
