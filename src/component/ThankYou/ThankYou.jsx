import { useEffect } from "react";
import { useNavigate } from "react-router";
import Banner from "../Banner/Banner";
import BgBanner from "/assets/all-banner.jpg";

function ThankYou() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <Banner
        bannerTitle={
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold  text-green-600">
              ✅ Thank you for your order!
            </h1>
            <p className="text-lg text-gray-600">Redirecting to home...</p>
          </div>
        }
        bgBanner={BgBanner}
      />
    </div>
  );
}

export default ThankYou;
