import Grocery from "/assets/grocery.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router";

function Hero() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="min-h-screen  max-w-[1400px] mx-auto px-10  md:pt-25 pt-35 flex items-center mt-25 md:flex-row flex-col">
        <div className="flex-1">
          <span className="bg-orange-200 text-orange-500 rounded-full px-5 py-2 text-lg">
            Export Best Quailty ...
          </span>
          <h1 className="md:text-7xl/20 text-5xl/14 font-blod mt-3">
            Tasty Organic <span className="text-orange-500">Furits</span> &{" "}
            <span className="text-orange-500">Vaggies</span> <br /> In Your City
          </h1>
          <p className="text-zinc-600 md:text-lg text-md max-w-[530px] mt-5 mb-10">
            Bred for a high content of beneficial substances. Our products are
            all fresh and healthy.
          </p>
          <Button
            onClick={() => navigate("/allproduts")}
            content={"Shop Now"}
          />
        </div>
        <div className="flex-1">
          <img src={Grocery} alt="Content-Image" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
