import Heading from "../Heading/Heading";
import { FaHeart, FaLeaf, FaSeedling, FaShieldAlt } from "react-icons/fa";
import BasketFull from "/assets/basket-full-vegetables.png";

const Values = () => {
  function leftValue() {
    return value.slice(0, 2).map((ele, index) => {
      return (
        <div
          key={index}
          className="flex md:flex-row-reverse items-center gap-7"
        >
          <div>
            <span className="flex justify-center items-center text-white bg-gradient-to-b from-orange-400 to-orange-500 w-15 h-15 rounded-full ">
              {ele.icon}
            </span>
          </div>
          <div className="md:text-right">
            <h3 className="text-zinc-800 font-bold text-3xl">{ele.title}</h3>
            <p className=" text-zinc-600">{ele.para}</p>
          </div>
        </div>
      );
    });
  }
  function rightValue() {
    return value.slice(2).map((ele, index) => {
      return (
        <div key={index} className="flex items-center gap-7">
          <div>
            <span className="flex justify-center items-center text-white bg-gradient-to-b from-orange-400 to-orange-500 w-15 h-15 rounded-full ">
              {ele.icon}
            </span>
          </div>
          <div>
            <h3 className="text-zinc-800 font-bold text-3xl">{ele.title}</h3>
            <p className=" text-zinc-600">{ele.para}</p>
          </div>
        </div>
      );
    });
  }
  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-10 py-20 ">
        <Heading highlight="Ours" heading="Value" />
        <div className="flex md:gap-5 gap-15 mt-15  md:flex-row flex-col  ">
          <div className="flex md:min-h-100 gap-15 justify-between flex-col">
            {leftValue()}
          </div>
          <div className="md:flex w-1/2  hidden">
            <img src={BasketFull} />
          </div>
          <div className="flex md:min-h-100 gap-15 justify-between flex-col">
            {rightValue()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;

const value = [
  {
    id: 1,
    title: "Trust",
    para: "It is a long established fact that a reader will be distracted by the readable.",
    icon: <FaHeart />,
  },
  {
    id: 2,
    title: "Always Fresh",
    para: "It is a long established fact that a reader will be distracted by the readable.",
    icon: <FaLeaf />,
  },
  {
    id: 3,
    title: "Food Safety",
    para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    icon: <FaShieldAlt />,
  },
  {
    id: 4,
    title: "100% Organic",
    para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    icon: <FaSeedling />,
  },
];
