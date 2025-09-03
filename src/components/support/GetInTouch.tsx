import support from "@/assets/getInTouch/get-in-touch.webp";
import { Separator } from "../ui/separator";
import { MapPin, Phone } from "lucide-react";
export default function GetInTouch() {
  return (
    <div className="mt-28 mb-44 container mx-auto grid grid-cols-2 gap-20 items-center">
      <div className="space-y-6">
        <h5 className="text-2xl text-pretty font-semibold text-primary">
          Get In Touch
        </h5>
        <h2 className="text-6xl text-pretty font-bold leading-16">
          We’d Love to Hear From You
        </h2>
        <p className="text-muted-foreground leading-6">
          Whether you’re a rider with feedback, a driver with questions, or a
          partner looking to collaborate — our team is here to help. Reach out
          anytime, and we’ll get back to you as soon as possible.
        </p>
        <div className="space-y-3">
          <h3 className="text-pretty text-3xl font-medium">Our Office</h3>
          <Separator></Separator>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="text-pretty text-2xl">Dhaka</h5>
              <div className="space-y-2">
                <span className="flex gap-2">
                  <MapPin className="text-primary font-bold" /> 12/154 Road-3, Monipur, Mirpur-2, Dhaka-1216
                </span>
                <span className="flex gap-2">
                  <Phone className="text-primary font-bold" /> +8801770000000
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="text-pretty text-2xl">Chittagong</h5>
              <div className="space-y-2">
                <span className="flex gap-2">
                  <MapPin className="text-primary font-bold" /> 77 Bypass, Mohindra, Chowmik, Chittagong
                </span>
                <span className="flex gap-2">
                  <Phone className="text-primary font-bold" /> +8801880000000
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
