import { useNavigate } from "react-router";
import Heading from "../Heading/Heading";
import { useDispatch, useSelector } from "react-redux";
import { saveInvoice } from "../../Features/Invoice/InvoiceSlice";
import { deleteCartAndSave } from "../../Features/Cart/CartSlice";
import { useState } from "react";

const InvoicePage = () => {
  const { cart } = useSelector((state) => state.cart);
  const [showModal, setShowModel] = useState(false);
  const dispatch = useDispatch();

  const totalPrice = cart?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0 || 0
  );

  const navigate = useNavigate();

  const confirmOrder = () => {
    if (cart?.items?.length === 0) return;

    dispatch(saveInvoice(cart));

    setShowModel(true);

    setTimeout(() => {
      dispatch(deleteCartAndSave());

      setShowModel(false);

      navigate("/");
    }, 3000);
  };

  return (
    <div className="max-w-[1400px] mx-auto py-20 px-10 sm:px-6 md:px-10 ">
      <div
        className={`md:pt-20 pt-10 bg-gray-100 pb-10 p-10 flex-1 ${
          showModal ? "filter blur-sm" : ""
        } transition-all`}
      >
        <Heading highlight="In" heading="voice"></Heading>

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
              {cart?.items?.map((item, index) => (
                <tr
                  key={item.id}
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
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className="bg-white rounded-2xl p-10 text-center max-w-sm w-full
              transform scale-75 opacity-0 animate-scaleIn"
          >
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              Thank You!
            </h2>
            <p className="text-gray-600">Your order has been confirmed.</p>

            {/* Inline animation */}
            <style>
              {` @keyframes scaleIn {
                  0% { transform: scale(0.75); opacity: 0; }
                  100% { transform: scale(1); opacity: 1; }
                }
                .animate-scaleIn {
                  animation: scaleIn 0.5s ease-out forwards;
                }`}
            </style>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
