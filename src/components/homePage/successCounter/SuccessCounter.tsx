import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllRidesStatsQuery } from "@/redux/features/ride/ride.api";

export default function SuccessCounter() {
  const { ref, inView } = useInView({
    triggerOnce: true, // trigger only once when visible
    threshold: 0.2, // 20% of element should be visible
  });
  const { data, isLoading } = useGetAllRidesStatsQuery(undefined);
  console.log(data);
  
  const ridesData = data?.data;
  console.log(data);
  return (
    <div ref={ref} className="container mx-auto mt-28">
      {isLoading && (
        <div className="max-w-xl mx-auto grid grid-cols-2 lg:gap-16 md:gap-6 gap-3 lg:mt-16 md:mt-10 mt-6 text-center">
          <div className="p-6 lg:space-y-3 space-y-2 ">
            <Skeleton className="w-[220px] h-[160px] rounded-xl"></Skeleton>
          </div>

          <div className="p-6 lg:space-y-3 space-y-2 ">
            <Skeleton className="w-[220px] h-[160px] rounded-xl"></Skeleton>
          </div>
          <h3 className="text-pretty text-3xl font-bold lg:text-4xl col-span-2">
            <Skeleton className="w-[450px] h-[40px] rounded-xl mx-auto"></Skeleton>
          </h3>
          <div className="p-6 lg:space-y-3 space-y-2 ">
            <Skeleton className="w-[220px] h-[160px] rounded-xl"></Skeleton>
          </div>
          <div className="p-6 lg:space-y-3 space-y-2 ">
            <Skeleton className="w-[220px] h-[160px] rounded-xl"></Skeleton>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="max-w-xl mx-auto grid grid-cols-2 lg:gap-16 md:gap-10 gap-5 lg:mt-16 md:mt-10 mt-6 text-center font-fontBody px-8 lg:px-0 md:px-0">
          <div className="bg-[#f3eefd] p-6 lg:space-y-3 space-y-2 border-b-8 rounded-xl dark:bg-[#bb9bf7]">
            <div className="flex justify-center"></div>
            <h2 className="lg:text-5xl text-3xl text-maroon-color font-medium">
              {inView ? (
                <CountUp
                  start={0}
                  end={ridesData.totalRides || 0}
                  duration={2.75}
                ></CountUp>
              ) : (
                "0"
              )}
            </h2>
            <p className="text-primary font-semibold lg:text-xl md:text-xl">Total Rides</p>
          </div>

          <div className="bg-[#f3eefd] p-6 lg:space-y-3 space-y-2 border-b-8 rounded-xl dark:bg-[#bb9bf7]">
            <div className="flex justify-center"></div>
            <h2 className="lg:text-5xl text-3xl text-maroon-color font-medium">
              {inView ? (
                <CountUp
                  start={0}
                  end={ridesData.totalCompleteRides || 0}
                  duration={2.75}
                ></CountUp>
              ) : (
                "0"
              )}
            </h2>
            <p className="text-primary font-semibold lg:text-xl md:text-xl text-sm">
              Total Completed Rides
            </p>
          </div>
          <h3 className="text-pretty text-3xl font-bold lg:text-4xl col-span-2 lg:my-0 md:my-0 my-4">
            <span className="text-primary">TripSync </span> in Numbers
          </h3>
          <div className="bg-[#f3eefd] p-6 lg:space-y-3 space-y-2 border-b-8 rounded-xl dark:bg-[#bb9bf7]">
            <div className="flex justify-center"></div>
            <h2 className="lg:text-5xl text-3xl text-maroon-color font-medium">
              {inView ? (
                <CountUp
                  start={0}
                  end={ridesData.ridesInLast7Days || 0}
                  duration={2.75}
                ></CountUp>
              ) : (
                "0"
              )}
            </h2>
            <p className="text-primary font-semibold lg:text-xl md:text-xl text-sm">
              Rides in Last 7 Days
            </p>
          </div>
          <div className="bg-[#f3eefd] p-6 lg:space-y-3 space-y-2 border-b-8 rounded-xl dark:bg-[#bb9bf7]">
            <div className="flex justify-center"></div>
            <h2 className="lg:text-5xl text-3xl text-maroon-color font-medium">
              {inView ? (
                <CountUp
                  start={0}
                  end={ridesData.ridesInLast30Days || 0}
                  duration={2.75}
                ></CountUp>
              ) : (
                "0"
              )}
            </h2>
            <p className="text-primary font-semibold lg:text-xl md:text-xl text-sm">
              Rides in Last 30 Days
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
