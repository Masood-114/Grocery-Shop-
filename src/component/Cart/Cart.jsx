import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartAndSave,
  increaseQtyAndSave,
  removeItemAndSave,
} from "../../Features/Cart/CartSlice";
import { saveInvoice } from "../../Features/Invoice/InvoiceSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const totalPrice = cart?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-30 mt-25">
        <h2 className="text-2xl font-semibold mb-8">
          Your cart is <spam className="text-orange-500">empty</spam> 🛒
        </h2>
        <Link
          to="/"
          className="bg-gradient-to-b from-orange-400 to-orange-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      if (!cart?.items?.length === 0) return;

      const status = "PAID";
      dispatch(saveInvoice({ cart, total: totalPrice, status }));
      navigate("/invoicepage");
    }
  };

  return (
    <section>
      <div className=" max-w-[1400px] mx-auto py-30 px-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Cart 🛍️</h1>

        <div className="flex flex-col gap-6">
          {cart?.items?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-md border"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: <strong>{item.quantity}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span className="font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <div className="flex flex-1 gap-5">
                  <button
                    onClick={() => dispatch(deleteCartAndSave(item.id))}
                    disabled={item.quantity === 1}
                    className="bg-gradient-to-b from-orange-400 to-orange-500
     text-white  h-13 w-13 rounded-lg md:text-2xl text-md 
     hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer flex-1"
                  >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(increaseQtyAndSave(item.id))}
                    className="bg-gradient-to-b from-orange-400 to-orange-500
     text-white  h-13 w-13 rounded-lg md:text-2xl text-md 
     hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer flex-1"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeItemAndSave(item.id))}
                  className="bg-gradient-to-b from-red-400 to-red-500
     text-white px-8 py-3 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-red-600 transition-all duration-300 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10 border-t pt-6">
          <h2 className="text-2xl font-bold">Total: ${totalPrice}</h2>

          <div className="flex gap-4">
            <button
              onClick={() => dispatch(deleteCartAndSave())}
              className="bg-gradient-to-b from-red-400 to-red-500
     text-white px-8 py-3 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-red-600 transition-all duration-300 cursor-pointer"
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              className="bg-gradient-to-b from-green-400 to-green-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
