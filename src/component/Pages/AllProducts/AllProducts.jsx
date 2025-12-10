import { useParams } from "react-router";
import CategoryPages from "../../CategoryPages/CategoryPages";
import BgBanner from "/assets/all-banner.jpg";

const AllProducts = () => {
  const { categories } = useParams();
  return (
    <div>
      <CategoryPages
        bannerTitle={`${categories} Products`}
        bgBanner={BgBanner}
        categories={categories}
      />
    </div>
  );
};

export default AllProducts;
