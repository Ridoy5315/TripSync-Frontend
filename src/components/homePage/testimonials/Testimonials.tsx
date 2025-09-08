import photo1 from "@/assets/testimonials/women1.jpg";
import photo2 from "@/assets/testimonials/men1.webp";
import photo3 from "@/assets/testimonials/women2.jpeg";
import photo4 from "@/assets/testimonials/men2.jpg";
import photo5 from "@/assets/testimonials/men3.jpeg";
import photo6 from "@/assets/testimonials/women3.jpeg";
import photo7 from "@/assets/testimonials/men4.jpg";
import photo from "@/assets/testimonials/city.jpg";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Testimonials() {
  const swiperOptions = [
    {
      image: photo1,
      name: "Olivia Smith",
      description:
        "The driver arrived right on time and greeted me warmly. The car was very clean, and the ride felt smooth and safe. I especially appreciated how the driver followed traffic rules carefully.",
    },
    {
      image: photo2,
      name: "Liam Johnson",
      description:
        "Overall a good experience. The driver was friendly and engaging, but the pickup location was a little hard to find. Once I got in, the ride was comfortable, and the journey was on time.",
    },
    {
      image: photo3,
      name: "Emma Brown",
      description:
        "The ride was comfortable, and the driver knew the route very well. They adjusted the air conditioning perfectly and even offered some water. Definitely felt safe and valued as a passenger.",
    },
    {
      image: photo4,
      name: "Noah Davis",
      description:
        "The car was neat and tidy, and the driver was polite. The only issue was that we got stuck in traffic longer than expected, but the driver communicated well about the delay.",
    },
    {
      image: photo5,
      name: "William Miller",
      description:
        "It was a pleasant ride overall. The driver was courteous and patient, explaining the route options. I liked how the ride was smooth despite some heavy traffic.",
    },
    {
      image: photo6,
      name: "Sophia Taylor",
      description:
        "The driver was very professional and followed all safety protocols. I felt secure throughout the ride. The only minor issue was the music was a little loud, but nothing major.",
    },
    {
      image: photo7,
      name: "Lucas Harris",
      description:
        "Great experience! The driver was friendly and helped with my luggage. The car smelled fresh, and the seat was very comfortable. I would definitely book with this driver again.",
    },
  ];
  return (
    <div
      className="lg:-mt-10 md:-mt-10 mt-16 w-full relative bg-cover bg-center lg:h-[500px] md:h-[500px] h-[360px]"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/80 dark:from-black/10 dark:to-black/80"></div>
      <div className="absolute inset-0 lg:my-16 md:my-16 my-12 ">
        <p className="text-white text-center md:text-3xl text-2xl font-bold lg:text-4xl">
          Feedback from the Front Seat
        </p>
        <div className="lg:max-w-2xl md:max-w-xl max-w-sm mx-auto lg:mt-16 md:mt-16 mt-10">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: true,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {swiperOptions &&
              swiperOptions.map((option) => (
                <SwiperSlide>
                  <div className="block rounded-md border border-gray-300 shadow-sm px-4 pb-6 lg:px-6 lg:py-6 md:px-6 md:py-6 text-black bg-white/90 dark:bg-white/70">
                    <div className="flex lg:gap-10 md:gap-8 gap-6">
                      <div className="lg:space-y-10 md:space-y-6 space-y-4 text-muted-foreground">
                        <div className="">
                          <p className="mt-4 lg:text-sm md:text-sm text-xs text-justify text-pretty dark:text-black">
                            {option.description}
                          </p>
                        </div>
                        <div>
                          <h5 className="text-pretty font-medium dark:text-black">
                            {option.name}
                          </h5>
                        </div>
                      </div>
                      <div className="lg:h-40 lg:w-60 md:h-40 md:w-60 h-32 w-48 mt-4 lg:mt-0 md:mt-0">
                        <Avatar className="lg:w-32 lg:h-32 md:w-32 md:h-32 w-20 h-20">
                          <AvatarImage
                            className="object-cover object-center"
                            src={option.image}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
