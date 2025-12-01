import { Link } from "react-router";

export default function Process() {
  const steps = [
    {
      title: "Browse Products",
      description:
        "Explore our wide range of fresh products and choose what you need.",
    },
    {
      title: "Add to Cart",
      description:
        "Easily add your favorite products to the cart and manage quantities.",
    },
    {
      title: "Checkout & Payment",
      description:
        "Review your cart, place your order, and pay securely through our checkout.",
    },
    {
      title: "Fast Delivery",
      description:
        "Get your order delivered quickly and reliably right to your door.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-10">How It Works</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-3xl font-bold text-orange-500 mb-3">
              {index + 1}
            </div>
            <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Optional CTA */}
      <div className="mt-10 text-center">
        <Link
          to="/"
          className="bg-gradient-to-b from-orange-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:scale-105 hover:to-orange-600 transition-all duration-300"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
