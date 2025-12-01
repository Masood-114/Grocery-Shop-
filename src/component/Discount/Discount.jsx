import Button from "../Button/Button";
import DiscountBg from "/assets/fresh-fruits.png";

const Discount = () => {
  return (
    <section
      className="bg-zinc-100 bg-contain bg-no-repeat bg-right"
      style={{ backgroundImage: `url(${DiscountBg})` }}
    >
      <div className=" flex md:flex-row flex-col max-w-[1400px] mx-auto px-10  py-10 ">
        <span className="text-orange-500 font-bold text-5xl md:text-9xl -transform md:-rotate-90 md:self-center">
          20%
        </span>

        <div className="max-w-[750px]">
          <h3 className="text-zinc-800 text-4xl md:text-7xl font-bold">
            First Order Discount!
          </h3>
          <p className="text-zinc-600 my-6">
            Enjoy an exclusive first order discount on our grocery website! Shop
            fresh essentials and save big on your first purchase. Fast delivery
            and quality guaranteed
          </p>
          <Button content="Get a Discount" />
        </div>
      </div>
    </section>
  );
};

export default Discount;
