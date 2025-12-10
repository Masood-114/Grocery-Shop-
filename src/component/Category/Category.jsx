import Heading from "../Heading/Heading";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fillterByCategory } from "../../Features/Products/ProductsSlice";
import {
  shopByCategory,
  fetchCategory,
} from "../../Features/Category/CategorySlice";
function Category() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  useEffect(() => {
    if (list.length > 0) dispatch(shopByCategory());
  }, [list, dispatch]);

  function renderCards() {
    return list.map((ele, index) => {
      return (
        <div key={index} className="flex-1 basis-[300px] ">
          <div className="w-full min-h-[30vh] relative -mb-16">
            <img src={ele.image} className="absolute mb-0" />
          </div>
          <div className="bg-zinc-100 pt-17 p-8 rounded-xl flex flex-col items-center">
            <h3 className="text-zinc-800 text-xl font-semibold mt-4 mb-5">
              {ele.title}
            </h3>

            <Link
              to={ele.path}
              onClick={() => dispatch(fillterByCategory(ele.category))}
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
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-6">
          {renderCards()}
        </div>
      </div>
    </section>
  );
}

export default Category;
