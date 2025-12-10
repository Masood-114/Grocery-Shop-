import { FaPlus } from "react-icons/fa";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addItemAndSave } from "../../Features/Cart/CartSlice";

const Cards = ({ content }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItem = () => {
    if (!content) return;
    dispatch(addItemAndSave(content));
  };

  const handleShopNow = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-zinc-200 rounded-lg p-2 mt-8">
      <div className="flex justify-between  ">
        <button
          onClick={handleAddItem}
          className="bg-gradient-to-b from-orange-400 to-orange-500
     text-white  h-9 w-9 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer flex justify-center items-center"
        >
          <FaPlus />
        </button>
      </div>
      <div className=" w-full   object-contain mt-5 ">
        <img src={content.image} className="w-full h-full  " />
      </div>
      <div className="text-center mt-2">
        <h3 className="text-2xl font-semi-bold">{content.name}</h3>
        <p className="text-2xl font-bold mt-4 mb-3">${content.price}</p>
        <Button content="Shop Now " onClick={handleShopNow} />
      </div>
    </div>
  );
};

export default Cards;
