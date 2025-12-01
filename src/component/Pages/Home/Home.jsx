import { CartProvider } from "../../../Context/CartContext";
import { CategoryProvider } from "../../../Context/CategoryContext";
import { ProductsProvider } from "../../../Context/ProductContext";
import { ProfessionalProvider } from "../../../Context/ProfessionalContext";
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
      <CategoryProvider>
        <Category />
      </CategoryProvider>
      <Values />

      <Produts />

      <Discount />
      <OurProcess />
      <ProfessionalProvider>
        <Testimonials />
      </ProfessionalProvider>
    </div>
  );
};

export default Home;
