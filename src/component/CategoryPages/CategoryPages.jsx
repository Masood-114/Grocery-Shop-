import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Cards from "../Cards/Cards";

export default function CategoryPages({
  bannerTitle,
  bgBanner,
  categories = [],
}) {
  const [allProducts, setAllProducts] = useState([]);
  async function dataApi() {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.log("ProductsError", error);
    }
  }
  useEffect(() => {
    dataApi();
  }, []);
  const filterProducts = categories.includes("All")
    ? allProducts
    : allProducts.filter((item) => categories.includes(item.category));
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
