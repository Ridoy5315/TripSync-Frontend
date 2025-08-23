import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function SuccessCounter() {
  const { ref, inView } = useInView({
    triggerOnce: true, // trigger only once when visible
    threshold: 0.2, // 20% of element should be visible
  });
  // const [counter, setCounter] = useState(false);
  return (
    <div
      ref={ref}
      className="container mx-auto mt-28"
    >
      {/* <div className=" text-center space-y-2">
        <h3 className="text-pretty text-3xl font-bold lg:text-4xl">
          <span className="text-primary">TripSync </span> in Numbers
        </h3>
        <p className="text-muted-foreground mb-8 lg:text-lg max-w-3xl mx-auto">
          We’re proud to serve a growing community with reliable, safe, and
          comfortable rides every day — and the numbers speak for themselves.
        </p>
      </div> */}
      <div className="max-w-xl mx-auto grid grid-cols-2 lg:gap-16 md:gap-6 gap-3 lg:mt-16 md:mt-10 mt-6 text-center font-fontBody">
        <div className="bg-[#f3eefd] p-6 lg:space-y-3 space-y-2 border-b-8 rounded-xl dark:bg-[#bb9bf7]">
          <div className="flex justify-center"></div>
          <h2 className="lg:text-5xl text-3xl text-maroon-color font-medium">
            {inView ? (
              <CountUp start={0} end={200} duration={2.75}></CountUp>
            ) : (
              "0"
            )}
          </h2>
          <p className="text-primary font-semibold lg:text-xl">Total Biodata</p>
        </div>

        <div className="bg-[#f3eefd] p-6 lg:space-y-3 space-y-2 border-b-8 rounded-xl dark:bg-[#bb9bf7]">
          <div className="flex justify-center"></div>
          <h2 className="lg:text-5xl text-3xl text-maroon-color font-medium">
            {inView ? (
              <CountUp start={0} end={200} duration={2.75}></CountUp>
            ) : (
              "0"
            )}
          </h2>
          <p className="text-primary font-semibold lg:text-xl">Total Biodata</p>
        </div>
        <h3 className="text-pretty text-3xl font-bold lg:text-4xl col-span-2">
          <span className="text-primary">TripSync </span> in Numbers
        </h3>
        <div className="bg-[#f3eefd] p-6 lg:space-y-3 space-y-2 border-b-8 rounded-xl dark:bg-[#bb9bf7]">
          <div className="flex justify-center"></div>
          <h2 className="lg:text-5xl text-3xl text-maroon-color font-medium">
            {inView ? (
              <CountUp start={0} end={200} duration={2.75}></CountUp>
            ) : (
              "0"
            )}
          </h2>
          <p className="text-primary font-semibold lg:text-xl">Total Biodata</p>
        </div>
        <div className="bg-[#f3eefd] p-6 lg:space-y-3 space-y-2 border-b-8 rounded-xl dark:bg-[#bb9bf7]">
          <div className="flex justify-center"></div>
          <h2 className="lg:text-5xl text-3xl text-maroon-color font-medium">
            {inView ? (
              <CountUp start={0} end={200} duration={2.75}></CountUp>
            ) : (
              "0"
            )}
          </h2>
          <p className="text-primary font-semibold lg:text-xl">Total Biodata</p>
        </div>
      </div>
    </div>
  );
}
