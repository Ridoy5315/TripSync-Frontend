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
    <section className="min-h-screen mx-auto container flex items-center overflow-hidden">
      <div className="w-full">
        <div className=" flex flex-col items-center space-y-8">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-pretty text-4xl mb-6 font-bold lg:text-5xl">
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
            <p className="animate__animated animate__slideInUp animate__slow text-muted-foreground text-center mx-auto mb-8 max-w-3xl lg:text-xl">
              From pickup to drop-off, enjoy a ride-sharing experience that
              prioritizes your safety, comfort, and efficiency.
            </p>
          </div>
          {/* RIGHT SIDE */}
          <Carousel plugins={[plugin.current]} className="w-full mt-8 mb-6">
            <CarouselContent className="-ml-1">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-none mx-5">
                    <Card className="p-0 border-0">
                      <CardContent className="px-0 w-96 h-64">
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
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row mt-20 space-x-3">
            <Button className="animate__animated animate__zoomIn animate__delay-1s w-full sm:w-auto">
              <Link
                to="join-driver"
              >
                Start Driving with Us
              </Link>
            </Button>

            <Button
              variant="outline"
              className="animate__animated animate__zoomIn animate__delay-1s animate__slow w-full  sm:w-auto"
            >
              <Link to="support/contactUs">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
