import { useEffect } from "react";
import Banner from "../Banner/Banner";
import Cards from "../Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fillterByCategory,
} from "../../Features/Products/ProductsSlice";

export default function CategoryPages({ bannerTitle, bgBanner, categories }) {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterProducts = categories.includes("All")
    ? list
    : list.filter((item) => categories.includes(item.category));

  const renderProducts = filterProducts.map((ele, index) => {
    return <Cards key={index} content={ele} />;
  });
  return (
    <div>
      <Banner bannerTitle={bannerTitle} bgBanner={bgBanner} />
      <div className=" grid grid-col-1 gap-9 md:grid-cols-4 mt-20 max-w-[1400px] mx-auto px-10">
        {renderProducts}
      </div>
    </div>
  );
}
