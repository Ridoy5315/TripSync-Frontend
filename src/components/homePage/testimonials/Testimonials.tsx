import photo from "@/assets/testimonials/city2.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Testimonials() {
  return (
    <div
      className="-mt-10 mb-20 w-full relative bg-cover bg-center lg:h-[500px] md:h-[500px] h-[360px]"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/80"></div>

      <div className="absolute inset-0 my-16 ">
        <p className="text-white text-center text-3xl font-bold lg:text-5xl">
          Feedback from the Front Seat
        </p>
        <div className="max-w-2xl mx-auto mt-16">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 text-black bg-white/90">
                <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                  <div className="space-y-10">
                    <div className="mt-4 sm:mt-0">
                      <p className="mt-4 line-clamp-2 text-sm text-pretty">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. At velit illum provident div, ipsa maiores
                        deleniti consectetur nobis et eaque.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Reading time</h5>
                      <p className="text-xs">12 minutes</p>
                    </div>
                  </div>
                  <div className=" h-40 w-60">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={photo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 text-black bg-white/90">
                <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                  <div className="space-y-10">
                    <div className="mt-4 sm:mt-0">
                      <p className="mt-4 line-clamp-2 text-sm text-pretty">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. At velit illum provident div, ipsa maiores
                        deleniti consectetur nobis et eaque.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Reading time</h5>
                      <p className="text-xs">12 minutes</p>
                    </div>
                  </div>
                  <div className=" h-40 w-60">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={photo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="text-white">Slide 3</SwiperSlide>
            <SwiperSlide className="text-white">Slide 4</SwiperSlide>
            <SwiperSlide className="text-white">Slide 5</SwiperSlide>
            <SwiperSlide className="text-white">Slide 6</SwiperSlide>
            <SwiperSlide className="text-white">Slide 7</SwiperSlide>
            <SwiperSlide className="text-white">Slide 8</SwiperSlide>
            <SwiperSlide className="text-white">Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
