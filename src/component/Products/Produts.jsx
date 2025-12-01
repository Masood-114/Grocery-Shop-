import { useContext, useEffect, useMemo, useState } from "react";
import Heading from "../Heading/Heading";
import Cards from "../Cards/Cards";
import { Link } from "react-router";
import { ProductsContext } from "../../Context/ProductContext";

const Produts = () => {
  const [tabActive, setTabActive] = useState("All");
  const { filterByCategory, product, filteredProducts } =
    useContext(ProductsContext);

  const categories_2 = useMemo(() => {
    if (!product || product.length === 0) return ["All"];
    const unique = [...new Set(product.map((p) => p.category))];
    return ["All", ...unique];
  }, [product]);
  useEffect(() => {
    filterByCategory(tabActive);
  }, [tabActive]);

  return (
    <section>
      <div className="max-w-[1400] mx-auto px-10 py-20">
        <Heading highlight="Our" heading="Products" />
        <div className="flex md:gap-10 mt-15 flex-wrap  justify-center">
          {categories_2.map((ele, index) => {
            return (
              <button
                key={index}
                className={`px-6 py-3 rounded-lg text-lg ${
                  tabActive === ele
                    ? "bg-gradient-to-b from-orange-400 to-orange-600 text-white"
                    : "text-zinc-600"
                }`}
                onClick={() => setTabActive(ele)}
              >
                {ele}
              </button>
            );
          })}
        </div>
        <div className="grid md:grid-cols-4 md:gap-9  grid-cols-1 gap-10 mt-10">
          {filteredProducts.slice(0, 8).map((ele, index) => {
            return <Cards key={index} content={ele} />;
          })}
        </div>
        <div className=" flex justify-center pt-15">
          <Link
            to={"/allproduts"}
            className="bg-gradient-to-b from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg md:text-xl text-md hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Produts;
