import { useGetDriverEarningHistoryQuery } from "@/redux/features/driver/driver.api";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const earningChartConfig = {
  earnings: {
    label: "Earnings",
  },
  today: {
    label: "Today",
    color: "var(--chart-1)",
  },
  last7days: {
    label: "Last 7 Days",
    color: "var(--chart-2)",
  },
  last30days: {
    label: "Last 30 Days",
    color: "var(--chart-3)",
  },
};

const ridesChartConfig = {
  earnings: {
    label: "Rides",
  },
  today: {
    label: "Today",
    color: "var(--chart-1)",
  },
  last7days: {
    label: "Last 7 Days",
    color: "var(--chart-2)",
  },
  last30days: {
    label: "Last 30 Days",
    color: "var(--chart-3)",
  },
};

export default function EarningsDashboard() {
  const { data: userData } = useGetOwnInfoQuery(undefined);
  console.log(userData?.data?.user?._id);
  const { data: driverData } = useGetDriverEarningHistoryQuery(
    userData?.data?.user?._id,
    { skip: !userData?.data?.user?._id}
  );
  console.log(driverData);

  const dataInfo = driverData?.data?.[0];

  const earningChartData = [
    {
      period: "today",
      earnings: dataInfo?.today?.[0]?.totalEarn || 0,
      fill: "var(--chart-1)",
    },
    {
      period: "last7days",
      earnings: dataInfo?.last7days?.[0]?.totalEarn || 0,
      fill: "var(--chart-2)",
    },
    {
      period: "last30days",
      earnings: dataInfo?.last30days?.[0]?.totalEarn || 0,
      fill: "var(--chart-3)",
    },
  ];
  const ridesChartData = [
    {
      period: "today",
      earnings: dataInfo?.today?.[0]?.totalRides || 0,
      fill: "var(--chart-1)",
    },
    {
      period: "last7days",
      earnings: dataInfo?.last7days?.[0]?.totalRides || 0,
      fill: "var(--chart-2)",
    },
    {
      period: "last30days",
      earnings: dataInfo?.last30days?.[0]?.totalRides || 0,
      fill: "var(--chart-3)",
    },
  ];
  return (
    <div className="grid grid-cols-2 p-4 justify-between gap-6">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>Today, Last 7 Days, Last 30 Days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={earningChartConfig}>
            <BarChart accessibilityLayer data={earningChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  earningChartConfig[value as keyof typeof earningChartConfig]
                    ?.label
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="earnings"
                strokeWidth={2}
                radius={8}
                activeIndex={0}
                activeBar={({ ...props }) => (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing earnings for Today, Last 7 Days, and Last 30 Days
          </div>
        </CardFooter>
      </Card>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Total Rides Overview</CardTitle>
          <CardDescription>Today, Last 7 Days, Last 30 Days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ridesChartConfig}>
            <BarChart accessibilityLayer data={ridesChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  ridesChartConfig[value as keyof typeof ridesChartConfig]
                    ?.label
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="earnings"
                strokeWidth={2}
                radius={8}
                activeIndex={0}
                activeBar={({ ...props }) => (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total rides for Today, Last 7 Days, and Last 30 Days
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
