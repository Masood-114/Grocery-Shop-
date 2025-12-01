import CategoryPages from "../../CategoryPages/CategoryPages";
import BgBanner from "/assets/seafood-banner.jpg";

const SeaFood = () => {
  return (
    <div>
      <CategoryPages
        bannerTitle={"Meat & SeaFood"}
        bgBanner={BgBanner}
        categories={["Meat", "SeaFood"]}
      />
    </div>
  );
};

export default SeaFood;
