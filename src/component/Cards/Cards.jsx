import { FaPlus } from "react-icons/fa";
import Button from "../Button/Button";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const Cards = ({ content }) => {
  const { addToCart, invoiceData, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  function handleCardShop() {
    addToCart(content);

    navigate("/cart");
  }

  return (
    <div className="bg-zinc-200 rounded-lg p-2">
      <div className="flex justify-between  ">
        <button
          onClick={() => addToCart(content)}
          className="bg-gradient-to-b from-orange-400 to-orange-500
     text-white  h-9 w-9 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer flex justify-center items-center"
        >
          <FaPlus />
        </button>
      </div>
      <div className=" h-50 w-full object-contain ">
        <img src={content.image} />
      </div>
      <div className="text-center mt-20">
        <h3 className="text-2xl font-semi-bold">{content.name}</h3>
        <p className="text-2xl font-bold mt-4 mb-3">${content.price}</p>
        <Button content="Shop Now " onClick={handleCardShop} />
      </div>
    </div>
  );
};

export default Cards;
