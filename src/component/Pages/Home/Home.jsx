import Category from "../../Category/Category";
import Discount from "../../Discount/Discount";
import Hero from "../../Hero/Hero";
import OurProcess from "../../OurProcess/OurProcess";
import Produts from "../../Products/Produts";
import Testimonials from "../../Testimonails/Testimonials";
import Values from "../../Values/Values";

const Home = () => {
  return (
    <div>
      <Hero />
      <Category />
      <Values />
      <Produts />
      <Discount />
      <OurProcess />
      <Testimonials />
    </div>
  );
};

export default Home;
