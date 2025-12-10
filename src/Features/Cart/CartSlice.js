import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const loadCart = createAsyncThunk("cart/loadCart", async () => {
  try {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);
    }
    const response = await fetch(
      `http://localhost:3000/cart?deviceId=${deviceId}`
    );
    const data = await response.json();

    if (data.length > 0) {
      return data[0];
    } else {
      const newCart = {
        id: uuidv4(),
        deviceId,
        items: [],
      };
      const createRes = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCart),
      });
      const dataRes = await createRes.json();
      return dataRes;
    }
  } catch (error) {
    console.log(error);
  }
});

export const saveCart = createAsyncThunk("cart/saveCart", async (cart) => {
  const response = await fetch(`http://localhost:3000/cart/${cart.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });
  const data = await response.json();
  return data;
});
export const addItemAndSave = (product) => async (dispatch, getState) => {
  const state = getState();

  if (!state.cart.cart) {
    await dispatch(loadCart());
  }
  dispatch(addItem(product));

  const updateCart = getState().cart.cart;
  if (updateCart) {
    dispatch(saveCart(updateCart));
  }
};

export const removeItemAndSave = (productID) => (dispatch, getState) => {
  dispatch(removeItem(productID));
  const { cart } = getState().cart;
  dispatch(saveCart(cart));
};

export const deleteCartAndSave = () => async (dispatch, getState) => {
  const { cart } = getState().cart;
  if (!cart) return;
  dispatch(clearCart());

  const updateCart = getState().cart.cart;

  if (updateCart) {
    await dispatch(saveCart(updateCart));
  }
};

export const increaseQtyAndSave = (productID) => (dispatch, getState) => {
  dispatch(increaseQty(productID));
  const { cart } = getState().cart;
  if (cart) dispatch(saveCart(cart));
};
export const decreaseQtyAndSave = (productID) => (dispatch, getState) => {
  dispatch(decreaseQty(productID));
  const { cart } = getState().cart;
  if (cart) dispatch(saveCart(cart));
};
const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.cart) return;

      const product = action.payload;
      const existing = state.cart.items.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.items.push({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (i) => i.id !== action.payload
      );
    },
    increaseQty: (state, action) => {
      const item = state.cart.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.cart.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      if (state.cart) state.cart.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveCart.fulfilled, (state, action) => {
        if (state.cart?.id) {
          state.cart = action.payload;
        }
      });
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
