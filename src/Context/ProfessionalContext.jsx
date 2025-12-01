import { createContext, useState, useEffect } from "react";

export const ProfessionalContext = createContext(null);
export const ProfessionalProvider = ({ children }) => {
  const [professional, setProfessional] = useState([]);
  async function dataApi() {
    try {
      const response = await fetch("http://localhost:3000/professional");
      const data = await response.json();
      setProfessional(data);
    } catch (error) {
      console.log("ProductsError", error);
    }
  }
  useEffect(() => {
    dataApi();
  }, []);
  return (
    <ProfessionalContext.Provider value={{ professional }}>
      {children}
    </ProfessionalContext.Provider>
  );
};
