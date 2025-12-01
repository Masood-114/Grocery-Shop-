import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ProductsProvider } from "./Context/ProductContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { InvoiceProvider } from "./Context/InvoiceContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ProductsProvider>
        <CartProvider>
          <InvoiceProvider>
            <App />
          </InvoiceProvider>
        </CartProvider>
      </ProductsProvider>
    </StrictMode>
  </BrowserRouter>
);
