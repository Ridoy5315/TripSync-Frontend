import HeroSection from "@/components/homePage/heroSection/HeroSection";
import HowItWorks from "@/components/homePage/howItWorks/HowItWorks";
import ServiceHighlights from "@/components/homePage/serviceHighlights/ServiceHighlights";
import Testimonials from "@/components/homePage/testimonials/Testimonials";

export default function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <HowItWorks></HowItWorks>
      <ServiceHighlights></ServiceHighlights>
      <Testimonials></Testimonials>
    </div>
  )
}
