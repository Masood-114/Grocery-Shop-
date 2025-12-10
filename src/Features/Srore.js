import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Products/ProductsSlice";
import categoryReducer from "../Features/Category/CategorySlice";
import testimonialsReducer from "../Features/Testimonails/TestimonailsSlice";
import cartReducer from "../Features/Cart/CartSlice";
import invoiceReducer from "../Features/Invoice/InvoiceSlice";
import userReducer from "../Features/User/UserSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    category: categoryReducer,
    testimonials: testimonialsReducer,
    cart: cartReducer,
    invoice: invoiceReducer,
    user: userReducer,
  },
});

export default store;
