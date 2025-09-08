import first from "@/assets/how-it-works/tabs.jpg";
import second from "@/assets/how-it-works/get-driver.jpg";
import third from "@/assets/how-it-works/track-driver.jpg";
import fourth from "@/assets/how-it-works/arrive.jpg";
import { MoveRight } from "lucide-react";
import "animate.css";
import { Fade } from "react-awesome-reveal";
export default function HowItWorks() {
  const contentsOptions = [
    {
      image: first,
      title: "Book in Just 2 Tabs",
      description:
        "With TripSync, book your ride in just two taps — confirm pickup and destination, then relax while your driver arrives.",
    },
    {
      image: second,
      title: "Get a Driver",
      description:
        "Once you confirm your ride request, TripSync instantly connects you with a nearby verified driver.",
    },
    {
      image: third,
      title: "Track Your Driver",
      description:
        "No more waiting in the dark. Know exactly when your ride is arriving and feel confident from pickup to drop-off.",
    },
    {
      image: fourth,
      title: "Arrive Safely",
      description:
        "Your safety is our top priority. From background-checked drivers, every journey is built with your protection in mind.",
    },
  ];
  return (
    <div className="container mx-auto mt-6 mb-20 px-8 lg:px-0">
      <div className="text-center space-y-2">
        <Fade triggerOnce>
          <h3 className="animate__animated animate__slideInUp text-pretty md:text-3xl text-2xl font-bold lg:text-4xl">
            How <span className="text-primary">TripSync </span>
            Works
          </h3>
        </Fade>
        <Fade delay={100} triggerOnce>
          <p className="animate__animated animate__slideInUp animate__slow text-muted-foreground lg:mb-8 md:mb-8 mb-4 max-w-lg lg:max-w-3xl mx-auto lg:text-lg md:text-base text-sm">
            A simple, step-by-step guide to getting you moving — whether you’re
            a rider or a driver.
          </p>
        </Fade>
      </div>
      <div className="grid lg:grid-cols-11 grid-cols-2 justify-center lg:items-center lg:gap-6 md:gap-6 gap-10">
        {contentsOptions &&
          contentsOptions.map((options, index) => (
            <>
              <Fade delay={300 + (index * 200)} triggerOnce className="lg:col-span-2">
                <div className="flex flex-col items-center space-y-2">
                  <div className="lg:h-28 lg:w-28 h-20 w-20">
                    <img
                      className="ring-background rounded-full h-full w-full ring-2 p-1 bg-white"
                      src={options?.image}
                      alt="Avatar 01"
                    />
                  </div>
                  <h5 className="text-pretty lg:text-lg">{options?.title}</h5>
                  <p className="text-muted-foreground lg:text-sm text-xs lg:text-center md:text-center text-justify">
                    {options?.description}
                  </p>
                </div>
              </Fade>
              {index < contentsOptions.length - 1 && (
                <Fade
                  delay={400 + index * 200}
                  triggerOnce
                  className="lg:col-span-1 hidden lg:block"
                >
                  <MoveRight
                    size={44}
                    color="#8e51fe"
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                  />
                </Fade>
              )}
            </>
          ))}
      </div>
    </div>
  );
}
