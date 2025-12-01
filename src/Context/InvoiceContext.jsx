import { createContext, useEffect, useState } from "react";

export const InvoiceContext = createContext(null);

export const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    try {
      async function fetchInvoice() {
        const response = await fetch("http://localhost:3000/invoice");
        const data = await response.json();
        setInvoice(data);
      }
      fetchInvoice();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const totalSale = invoice.reduce((sum, inv) => sum + inv.total, 0);
  const totalOrder = invoice.reduce((sum, item) => sum + item.items.length, 0);

  return (
    <InvoiceContext.Provider value={{ invoice, totalSale, totalOrder }}>
      {children}
    </InvoiceContext.Provider>
  );
};
