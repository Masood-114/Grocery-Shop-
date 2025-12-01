import CategoryPages from "../../CategoryPages/CategoryPages";
import BgBanner from "/assets/all-banner.jpg";

const AllProducts = () => {
  return (
    <div>
      <CategoryPages
        bannerTitle={"All Products"}
        bgBanner={BgBanner}
        categories={["All"]}
      />
    </div>
  );
};

export default AllProducts;
