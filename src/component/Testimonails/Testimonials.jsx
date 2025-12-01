import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Heading from "../Heading/Heading";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa6";
import { useContext } from "react";
import { ProfessionalContext } from "../../Context/ProfessionalContext";

function Testimonials() {
  const { professional } = useContext(ProfessionalContext);

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-10 py-20">
        <Heading highlight="Coustomers" heading="Saying" />
        <div className="flex  justify-end py-5 gap-x-3">
          <button className="custom-prev text-2xl rounded-lg w-11 h-11 bg-zinc-100 flex justify-center items-center hover:text-orange-500">
            <IoIosArrowBack />
          </button>
          <button className="custom-next text-2xl rounded-lg w-11 h-11 bg-zinc-100 flex justify-center items-center hover:text-orange-500">
            <IoIosArrowForward />
          </button>
        </div>
        <Swiper
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {professional.map((ele, index) => {
            return (
              <SwiperSlide key={index} className="bg-zinc-100 rounded-lg p-8">
                <div className="flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full  bg-amber-300 outline-2 outline-orange-400 outline-offset-4 overflow-hidden">
                    <img src={ele.image} className="h-full w-full" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold">{ele.name}</h5>
                    <p className="text-zinc-600">{ele.profession}</p>
                    <span className="flex text-xl text-yellow-400 gap-1">
                      {Array.from({ length: ele.rating }, (_, index) => (
                        <FaStar key={index} />
                      ))}
                    </span>
                  </div>
                </div>
                <div className="mt-10 min-h-[15vh]">
                  <p className="text-zinc-600">{ele.para}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials;
