import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import banner1 from "@/assets/banner/1.jpg";
import banner2 from "@/assets/banner/2.png";
import banner3 from "@/assets/banner/3.jpg";
import banner4 from "@/assets/banner/4.jpg";
import banner5 from "@/assets/banner/5.jpg";
import banner6 from "@/assets/banner/6.jpg";
import banner7 from "@/assets/banner/7.jpeg";
import banner8 from "@/assets/banner/8.jpg";
import banner9 from "@/assets/banner/9.jpg";
import banner10 from "@/assets/banner/10.png";
import banner11 from "@/assets/banner/11.jpg";
import banner12 from "@/assets/banner/12.jpg";
import banner13 from "@/assets/banner/13.jpg";
import banner14 from "@/assets/banner/14.jpg";
import "animate.css";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [startTypingTagline, setStartTypingTagline] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTypingTagline(true);
    }, 2700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const images = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
    banner7,
    banner8,
    banner9,
    banner10,
    banner11,
    banner12,
    banner13,
    banner14,
  ];

  return (
    <section className="lg:min-h-screen md:min-h-screen lg:mt-0 lg:mb-0 md:mt-0 md:mb-0 mt-14 mb-20 mx-auto container flex items-center overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col items-center lg:space-y-8 md:space-y-6 space-y-4 overflow-hidden">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-pretty md:text-3xl lg:mb-6 md:mb-3 font-bold lg:text-5xl hidden lg:block md:block">
              <span className="">
                <Typewriter
                  words={["Connecting People, "]}
                  loop={1}
                  typeSpeed={70}
                />
              </span>
              {startTyping && (
                <span className="text-primary">
                  <Typewriter
                    words={[
                      "One TripSync",
                      "One Ride",
                      "One Trip",
                      "One Journey",
                      "One Route",
                    ]}
                    loop={false}
                    cursor
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  ></Typewriter>
                </span>
              )}
              {startTypingTagline && (
                <span className="">
                  <Typewriter words={[" at a Time"]} loop={1} typeSpeed={70} />
                </span>
              )}
            </h1>
            <h1 className="lg:hidden md:hidden text-2xl font-bold text-pretty max-w-xs mb-4"><span className="text-primary">One TripSync</span> at a Time</h1>
            <p className="animate__animated animate__slideInUp animate__slow text-muted-foreground text-center mx-auto lg:mb-8 max-w-xl lg:max-w-3xl lg:text-xl md:text-base text-sm px-4 md:px-0">
              From pickup to drop-off, enjoy a ride-sharing experience that
              prioritizes your safety, comfort, and efficiency.
            </p>
          </div>
          {/* RIGHT SIDE */}
          <Carousel plugins={[plugin.current]} className="w-full mt-8 md:mt-3 lg:mb-6 mb-2 px-10 lg:px-0">
            <CarouselContent className="-ml-1">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-none lg:mx-5 lg:w-96 lg:h-64 md:w-80 md:h-56 w-[340px] h-60">
                    <Card className="p-0 border-0">
                      <CardContent className="px-0 lg:w-96 lg:h-64 md:w-80 md:h-56 w-[340px] h-60">
                        <img
                          className="rounded-2xl w-full h-full"
                          src={image}
                          alt=""
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex justify-center gap-2 flex-row lg:mt-20 mt-10 space-x-2 lg:space-x-3 md:pb-10">
            <Button className="animate__animated animate__zoomIn animate__delay-1s text-xs lg:text-sm">
              <Link
                to="join-driver"
              >
                Start Driving with Us
              </Link>
            </Button>

            <Button
              variant="outline"
              className="animate__animated animate__zoomIn animate__delay-1s animate__slow text-xs lg:text-sm"
            >
              <Link to="support/contactUs">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
