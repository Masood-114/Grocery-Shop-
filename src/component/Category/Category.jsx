import Heading from "../Heading/Heading";
import { Link } from "react-router";
import { useContext } from "react";
import { CategoryContext } from "../../Context/CategoryContext";

function Category() {
  const { category } = useContext(CategoryContext);

  function renderCards() {
    return category.map((ele, index) => {
      return (
        <div key={index} className="flex-1 basis-[300px] ">
          <div className="w-full min-h-[30vh] relative -mb-10">
            <img src={ele.image} className="absolute mb-0" />
          </div>
          <div className="bg-zinc-100 pt-17 p-8 rounded-xl">
            <h3 className="text-zinc-800 text-3xl font-bold">{ele.title}</h3>
            <p className="text-zinc-600 mt-3 mb-9">{ele.description}</p>
            <Link
              to={ele.path}
              className="bg-gradient-to-b from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg md:text-xl text-md  hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer"
            >
              See All
            </Link>
          </div>
        </div>
      );
    });
  }
  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-10 py-20 ">
        <Heading highlight={"Shop"} heading={"by Category"} />
        <div className="flex gap-10 md:mt-20 mt-10 flex-wrap">
          {renderCards()}
        </div>
      </div>
    </section>
  );
}

export default Category;
