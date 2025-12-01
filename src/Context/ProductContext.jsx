import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();
export const ProductsProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilterProduts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function dataApi() {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProduct(data);
      setFilterProduts(data);
      setLoading(false);
    } catch (error) {
      console.log("ProductsError", error);
    }
  }

  useEffect(() => {
    dataApi();
  }, []);

  const filterByCategory = (category) => {
    if (category === "All") {
      setFilterProduts(product);
    } else {
      setFilterProduts(product.filter((p) => p.category === category));
    }
  };
  const totalProducts = product.length;
  // Remove item
  async function removeFromProducts(productId) {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      setProduct((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.log(error);
    }
  }
  // Edit Item
  async function updateFromProducts(productId) {
    const updateItems = {
      name: "",
      price: "",
      category: "",
      image: "",
    };
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateItems),
        }
      );
      const data = await response.json();

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        product,
        updateFromProducts,
        setProduct,
        removeFromProducts,
        filteredProducts,
        loading,
        filterByCategory,
        totalProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
