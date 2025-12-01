import CategoryPages from "../../CategoryPages/CategoryPages";
import BgBanner from "/assets/fruits-banner.jpg";

const Fruits = () => {
  return (
    <div>
      <CategoryPages
        bannerTitle="Fruits & Veggies"
        bgBanner={BgBanner}
        categories={["Fruits", "Vegetables"]}
      />
    </div>
  );
};

export default Fruits;
