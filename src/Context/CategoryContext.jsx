import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext(null);
export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  async function dataApi() {
    try {
      const response = await fetch("http://localhost:3000/category");
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.log("ProductsError", error);
    }
  }
  useEffect(() => {
    dataApi();
  }, []);
  return (
    <CategoryContext.Provider value={{ category }}>
      {children}
    </CategoryContext.Provider>
  );
};
