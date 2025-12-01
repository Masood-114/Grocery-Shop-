import { Link } from "react-router";

export default function AboutUs() {
  return (
    <div className="max-w-[1400px] mx-auto p-5  py-45 px-10">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image section */}
        <div className="md:w-1/2">
          <img
            src="/assets/about.jpg" // replace with your image path
            alt="About Us"
            className="rounded-lg shadow-md w-full object-cover bg-gray-200"
          />
        </div>

        {/* Text section */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-700">
            Welcome to Green Grocery! We are passionate about providing the
            freshest products and the best shopping experience for our
            customers. Our journey began with a simple idea: to make quality
            groceries accessible to everyone.
          </p>

          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to deliver high-quality products with exceptional
            service. We focus on sustainability, supporting local farmers, and
            ensuring customer satisfaction with every order.
          </p>

          <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Fresh, high-quality products</li>
            <li>Fast and reliable delivery</li>
            <li>Excellent customer service</li>
            <li>Supporting local communities</li>
          </ul>
        </div>
      </div>

      {/* Optional CTA */}
      <div className="mt-10 text-center">
        <p className="text-lg text-gray-700 mb-4">
          Ready to explore our products?
        </p>

        <Link
          to={"/"}
          className="bg-gradient-to-b from-orange-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:scale-105 hover:to-orange-600 transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
