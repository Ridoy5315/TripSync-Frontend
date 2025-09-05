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
      className="-mt-10 w-full relative bg-cover bg-center lg:h-[500px] md:h-[500px] h-[360px]"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/80 dark:from-black/10 dark:to-black/80"></div>
      <div className="absolute inset-0 my-16 ">
        <p className="text-white text-center text-3xl font-bold lg:text-4xl">
          Feedback from the Front Seat
        </p>
        <div className="max-w-2xl mx-auto mt-16">
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
                  <div className="block rounded-md border border-gray-300 shadow-sm sm:p-6 text-black bg-white/90 dark:bg-white/70">
                    <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-10">
                      <div className="space-y-10 text-muted-foreground">
                        <div className="mt-4 sm:mt-0">
                          <p className="mt-4 text-sm text-pretty dark:text-black">
                            {option.description}
                          </p>
                        </div>
                        <div>
                          <h5 className="text-pretty font-medium dark:text-black">
                            {option.name}
                          </h5>
                        </div>
                      </div>
                      <div className=" h-40 w-60">
                        <Avatar className="w-32 h-32">
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
