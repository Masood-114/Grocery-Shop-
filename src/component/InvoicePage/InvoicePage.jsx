import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router";
import Heading from "../Heading/Heading";

const InvoicePage = () => {
  const { cart, totalPrice, clearCart, invoiceData } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.items.length === 0) return;
  function confirmOrder() {
    invoiceData();
    alert("✅ Order Confirmed!");
    clearCart();
    navigate("/thankyou");
  }

  return (
    <div className="max-w-[1400px] mx-auto py-20 px-10 sm:px-6 md:px-10 ">
      <div className="md:pt-20 pt-10 bg-gray-100 pb-10 p-10 flex-1">
        <Heading highlight="In" heading="voice"></Heading>

        {/* Invoice Header */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3 className="text-2xl font-bold">Order Summary</h3>
          <p>
            <strong>Cart ID:</strong> {cart?.id}
          </p>
          <p>
            <strong>Device ID:</strong> {cart?.deviceId}
          </p>
          <p>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Cart Items */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 ">
            <thead className="bg-gray-100">
              <tr>
                <th className="  border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Product
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Image
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Price
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Qty
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Subtotal
                </th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item, index) => (
                <tr
                  key={item.productId}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  <td className="border border-gray-300 px-6 py-4">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="70"
                      style={{ borderRadius: "8px" }}
                    />
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    ${item.price}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    ${item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Section */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <h2 className="text-2xl">Total: ${totalPrice}</h2>
        </div>

        {/* Checkout Buttons */}
        <div className=" flex md:justify-around flex-col sm:flex-row  gap-4 mt-6  ">
          <button
            onClick={() => window.print()}
            className="bg-gradient-to-b from-yellow-400 to-yellow-500
     text-white px-8 py-3 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-yellow-600 transition-all duration-300 cursor-pointer"
          >
            Print Invoice
          </button>

          <button
            onClick={confirmOrder}
            className="bg-gradient-to-b from-orange-400 to-orange-500
     text-white px-8 py-3 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
