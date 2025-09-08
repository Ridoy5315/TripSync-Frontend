import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetDriverQuery,
  useGetRevenueQuery,
  useGetRidesVolumeQuery,
} from "@/redux/features/admin/admin.api";
import {
  driverCountStatsFunction,
  driverStatsFunction,
  revenueStatsFunction,
  rideStatsFunction,
} from "@/utils/analyticsStats";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function AnalyticsDashboard() {
  const { data: rides, isLoading: ridesLoading } =
    useGetRidesVolumeQuery(undefined);
  const { data: revenue, isLoading: revenueLoading } =
    useGetRevenueQuery(undefined);
  const { data: driverData, isLoading: driverDataLoading } = useGetDriverQuery({
    params: {},
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const ridesVolume = rides?.data;
  const revenueTrends = revenue?.data;

  const rideStats = rideStatsFunction(ridesVolume);
  const revenueStats = revenueStatsFunction(revenueTrends);
  const driverCountStats = driverCountStatsFunction(driverData);
  const driverStats = driverStatsFunction(driverData);

  //bg-foreground/10 bg-${stat.color}-400
  return (
    <div ref={ref} className="lg:p-5 p-2 space-y-10">
      <div>
        <h3 className="text-primary font-semibold lg:text-2xl text-xl mb-4">
          Ride Analytics
        </h3>
        <div className="grid grid-cols-3 lg:gap-5 gap-2">
          {ridesLoading &&
            Array.from({ length: 9 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-[374px] h-[116px]" />
              </div>
            ))}

          {!ridesLoading &&
            rideStats &&
            rideStats.map((stat) => (
              <div
                className={`relative z-10 lg:p-6 p-3 max-w-sm w-full bg-primary/5 dark:bg-foreground/10 backdrop-blur-[4px] 
                rounded-2xl border border-white/10 before:content-[''] before:absolute before:inset-0 
                before:rounded-2xl before:border before:border-foreground/10 transform transition duration-300
                hover:scale-105 hover:shadow-xl hover:bg-primary/10 dark:hover:bg-foreground/20`}
              >
                <h2 className="lg:text-lg font-semibold text-pretty lg:mb-0 mb-4">
                  {stat.title} :
                </h2>
                <p className="text-muted-foreground text-4xl lg:text-end text-center">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.count || 0}
                      duration={2.75}
                    ></CountUp>
                  ) : (
                    "0"
                  )}{" "}
                </p>
              </div>
            ))}
        </div>
      </div>
      <Separator className="my-4"></Separator>
      <div>
        <h3 className="text-primary font-semibold lg:text-2xl text-xl mb-4">Revenue</h3>
        <div className="grid grid-cols-2 gap-5">
          {revenueLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-[374px] h-[116px]" />
              </div>
            ))}
          {!revenueLoading &&
            revenueStats &&
            revenueStats.map((stat) => (
              <div
                className={`relative z-10 p-6 max-w-sm w-full mx-auto bg-primary/5 dark:bg-foreground/10 backdrop-blur-[4px] 
                rounded-2xl border border-white/10 before:content-[''] before:absolute before:inset-0 
                before:rounded-2xl before:border before:border-foreground/10 transform transition duration-300
                hover:scale-105 hover:shadow-xl hover:bg-primary/10 dark:hover:bg-foreground/20`}
              >
                <h2 className="lg:text-lg font-semibold text-pretty">
                  {stat.title} :
                </h2>
                <p className="text-muted-foreground text-4xl text-end">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.count || 0}
                      duration={2.75}
                    ></CountUp>
                  ) : (
                    "0"
                  )}{" "}
                  $
                </p>
              </div>
            ))}
        </div>
      </div>
      <Separator className="my-4"></Separator>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-primary font-semibold lg:text-2xl text-xl mb-4">
            Driver Activity
          </h3>
          <div
            className={`flex gap-8 relative z-10 lg:py-2 py-1 px-4 bg-primary/5 dark:bg-foreground/10 backdrop-blur-[4px] 
                rounded-lg border border-white/10 before:content-[''] before:absolute before:inset-0 
                before:rounded-2xl before:border before:border-foreground/10 transform transition duration-300
                hover:scale-105 hover:shadow-xl hover:bg-primary/10 dark:hover:bg-foreground/20`}
          >
            {driverDataLoading && <Skeleton className="w-[198px] h-[44px]" />}
            {!driverDataLoading && (
              <>
                <h2 className="lg:text-lg font-semibold text-pretty">
                  Total Driver :
                </h2>
                <p className="text-muted-foreground lg:text-xl text-lg">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={driverData?.totalDriver?.data.length || 0}
                      duration={2.75}
                    ></CountUp>
                  ) : (
                    "0"
                  )}{" "}
                  $
                </p>
              </>
            )}
          </div>
        </div>
        <div className="lg:space-y-10 space-y-6">
          <div className="grid grid-cols-3 lg:gap-5 gap-3">
            {driverDataLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-[374px] h-[116px]" />
                </div>
              ))}
            {!driverDataLoading &&
              driverCountStats &&
              driverCountStats.map((stat) => (
                <div
                  className={`relative z-10 lg:p-6 p-3 max-w-sm w-full mx-auto bg-primary/5 dark:bg-foreground/10 backdrop-blur-[4px] 
                rounded-2xl border border-white/10 before:content-[''] before:absolute before:inset-0 
                before:rounded-2xl before:border before:border-foreground/10 transform transition duration-300
                hover:scale-105 hover:shadow-xl hover:bg-primary/10 dark:hover:bg-foreground/20`}
                >
                  <h2 className="lg:text-lg font-semibold text-pretty">
                    {stat.title} :
                  </h2>
                  <p className="text-muted-foreground text-4xl text-end">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={stat.count || 0}
                        duration={2.75}
                      ></CountUp>
                    ) : (
                      "0"
                    )}{" "}
                    $
                  </p>
                </div>
              ))}
          </div>
          {/* driverStats */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            {driverDataLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-[382px] h-[200px]" />
                </div>
              ))}
            {!driverDataLoading &&
              driverStats &&
              driverStats.map((stat) => (
                <div
                  className="relative z-10 p-6 max-w-sm w-full mx-auto bg-primary/5 dark:bg-foreground/10 backdrop-blur-[4px] 
                rounded-2xl border border-white/10 before:content-[''] before:absolute before:inset-0 
                before:rounded-2xl before:border before:border-foreground/10 transform transition duration-300
                hover:scale-105 hover:shadow-xl hover:bg-primary/10 dark:hover:bg-foreground/20"
                >
                  <h4 className="text-lg font-semibold text-pretty mb-3">
                    {stat.title} :
                  </h4>
                  <div className="flex gap-8 items-center ">
                    <div className="">
                      {stat?.image ? (
                        <Avatar className="h-28 w-28 border-4">
                          <AvatarImage src={stat?.image} alt="Profile image" />
                        </Avatar>
                      ) : (
                        <Avatar className="h-28 w-28">
                          {stat?.name && (
                            <AvatarFallback className="text-primary w-full h-full">
                              {stat?.name[0]}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <h5 className="text-lg font-semibold">{stat.name}</h5>
                      <p>{stat.email}</p>
                      <p>{stat.address}</p>
                      <p>{stat.gender}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
