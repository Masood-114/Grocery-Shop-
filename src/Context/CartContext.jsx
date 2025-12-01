import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  // Load or create cart
  useEffect(() => {
    async function loadCart() {
      let storedId = localStorage.getItem("deviceId");

      if (!storedId) {
        storedId = uuidv4();
        localStorage.setItem("deviceId", storedId);
      }

      setDeviceId(storedId);

      try {
        const res = await fetch(
          `http://localhost:3000/cart?deviceId=${storedId}`
        );
        const data = await res.json();

        if (data.length > 0) {
          // use the FIRST and ONLY cart for this device
          setCart(data[0]);
        } else {
          // create a new empty cart
          const newCart = {
            id: uuidv4(),
            deviceId: storedId,
            items: [],
          };

          const created = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCart),
          });

          const result = await created.json();
          setCart(result);
        }
      } catch (err) {
        console.log("Cart Load Failed", err);
      }
    }

    loadCart();
  }, []);

  // Sync cart to backend
  async function saveCart(updatedCart) {
    await fetch(`http://localhost:3000/cart/${updatedCart.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCart),
    });

    setCart(updatedCart);
  }

  // Add to cart
  async function addToCart(product) {
    if (!cart) return;

    const existing = cart.items.find((i) => i.productId === product.id);

    let updatedItems;

    if (existing) {
      updatedItems = cart.items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [
        ...cart.items,
        {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          quantity: 1,
        },
      ];
    }

    const updatedCart = { ...cart, items: updatedItems };
    await saveCart(updatedCart);
  }

  // Remove item
  async function removeFromCart(productId) {
    const updatedItems = cart.items.filter((i) => i.productId !== productId);
    await saveCart({ ...cart, items: updatedItems });
  }

  // Clear cart
  async function clearCart() {
    await saveCart({ ...cart, items: [] });
  }

  // Increase quantity
  async function increaseQuantity(productId) {
    const updatedItems = cart.items.map((i) =>
      i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
    );

    await saveCart({ ...cart, items: updatedItems });
  }

  // Decrease quantity
  async function decreaseQuantity(productId) {
    const updatedItems = cart.items
      .map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);

    await saveCart({ ...cart, items: updatedItems });
  }

  // Total price
  const totalPrice =
    cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  // Total item count
  const cartCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // InvoiceData Save
  async function invoiceData() {
    if (!cart || cart.items.length === 0) return;

    const invoice = {
      id: uuidv4(),
      deviceId,
      items: cart.items,
      total: cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      createAt: new Date().toISOString(),
      status: "PAID",
    };

    await fetch("http://localhost:3000/invoice", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(invoice),
    });
    return invoice;
  }

  // Contact us
  async function contactData(detail) {
    const contact = {
      id: uuidv4(),
      deviceId,
      userDetail: {
        name: detail.name,
        email: detail.email,
        message: detail.message,
        subject: detail.subject,
        createAt: new Date().toISOString(),
        status: "SUCCESS",
      },
    };

    await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(contact),
    });
    return invoice;
  }

  return (
    <CartContext.Provider
      value={{
        contactData,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
        cartCount,
        invoiceData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
