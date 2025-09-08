import support from "@/assets/getInTouch/get-in-touch.webp";
import { Separator } from "../ui/separator";
import { MapPin, Phone } from "lucide-react";
export default function GetInTouch() {
  return (
    <div className="lg:mt-28 mt-10 mb-44 container lg:px-0 px-8 mx-auto lg:grid lg:grid-cols-2 flex flex-col-reverse lg:gap-20 md:gap-16 gap-10 items-center">
      <div className="space-y-6">
        <h5 className="lg:text-2xl md:text-2xl text-xl text-pretty font-semibold text-primary">
          Get In Touch
        </h5>
        <h2 className="lg:text-6xl md:text-6xl text-4xl text-pretty font-bold lg:leading-16 md:leading-16 leading-12">
          We’d Love to Hear From You
        </h2>
        <p className="text-muted-foreground leading-6">
          Whether you’re a rider with feedback, a driver with questions, or a
          partner looking to collaborate — our team is here to help. Reach out
          anytime, and we’ll get back to you as soon as possible.
        </p>
        <div className="space-y-3">
          <h3 className="text-pretty lg:text-3xl md:text-3xl text-2xl font-medium">Our Office</h3>
          <Separator></Separator>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="text-pretty lg:text-2xl md:text-2xl text-xl">Dhaka</h5>
              <div className="space-y-2 lg:text-base md:text-base text-sm">
                <span className="flex gap-2">
                  <MapPin className="text-primary font-bold" /> 12/154 Road-3, Monipur, Mirpur-2, Dhaka-1216
                </span>
                <span className="flex gap-2">
                  <Phone size={16} className="text-primary font-bold" /> +8801770000000
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="text-pretty lg:text-2xl md:text-2xl text-xl">Chittagong</h5>
              <div className="space-y-2 lg:text-base md:text-base text-sm">
                <span className="flex gap-2">
                  <MapPin className="text-primary font-bold" /> 77 Bypass, Mohindra, Chowmik, Chittagong
                </span>
                <span className="flex gap-2">
                  <Phone size={16} className="text-primary font-bold" /> +8801880000000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img className="rounded-2xl" src={support} alt="" />
      </div>
    </div>
  );
}
