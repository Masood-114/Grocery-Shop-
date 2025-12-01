import CategoryPages from "../../CategoryPages/CategoryPages";
import BgBanner from "/assets/dairy-banner.jpg";

const Dairy = () => {
  return (
    <div>
      <CategoryPages
        bannerTitle={"Dairy & Eggs"}
        bgBanner={BgBanner}
        categories={["Dairy", "Eggs"]}
      />
    </div>
  );
};

export default Dairy;
