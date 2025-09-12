interface RidesVolume {
  totalRides?: number;
  totalPendingRides?: number;
  totalCanceledRides?: number;
  totalRejectedRides?: number;
  totalCompleteRides?: number;
  totalOngoingRides?: number;
  todayRides?: number;
  ridesInLast7Days?: number;
  ridesInLast30Days?: number;
}

interface RideStat {
  title: string;
  count?: number;
}

export const rideStatsFunction = (ridesVolume: RidesVolume): RideStat[] => {
  const rideStats: RideStat[] = [
    { title: "Total Rides", count: ridesVolume?.totalRides },
    {
      title: "Total Pending Rides",
      count: ridesVolume?.totalPendingRides,
    },
    {
      title: "Total Canceled Rides",
      count: ridesVolume?.totalCanceledRides,
    },
    {
      title: "Total Rejected Rides",
      count: ridesVolume?.totalRejectedRides,
    },
    {
      title: "Total Completed Rides",
      count: ridesVolume?.totalCompleteRides,
    },
    {
      title: "Total Ongoing Rides",
      count: ridesVolume?.totalOngoingRides,
    },
    { title: "Today’s Rides", count: ridesVolume?.todayRides },
    {
      title: "Rides in Last 7 Days",
      count: ridesVolume?.ridesInLast7Days,
    },
    {
      title: "Rides in Last 30 Days",
      count: ridesVolume?.ridesInLast30Days,
    },
  ];

  return rideStats;
};

interface RevenueTrends {
  totalRevenue?: number;
  todaysRevenue?: number;
  revenueInLast7Days?: number;
  revenueInLast30Days?: number;
}

interface RevenueStat {
  title: string;
  count?: number;
}

export const revenueStatsFunction = (revenueTrends: RevenueTrends): RevenueStat[] => {
  const revenueStats: RevenueStat[] = [
    { title: "Total Revenue", count: revenueTrends?.totalRevenue },
    { title: "Today's Revenue", count: revenueTrends?.todaysRevenue },
    {
      title: "Revenue in Last 7 Days",
      count: revenueTrends?.revenueInLast7Days,
    },
    {
      title: "Revenue in Last 30 Days",
      count: revenueTrends?.revenueInLast30Days,
    },
  ];

  return revenueStats;
};

interface DriverCountStats {
  totalPendingDriver?: number;
  totalApprovedDriver?: number;
  totalRejectedDriver?: number;
  totalCurrentOnlineDriver?: number;
  totalCurrentOfflineDriver?: number;
  totalCurrentOnTripDriver?: number;
}

interface DriverCountStat {
  title: string;
  count?: number;
}

export const driverCountStatsFunction = (driverData: DriverCountStats): DriverCountStat[] => {
  const driverCountStats: DriverCountStat[] = [
    { title: "Pending Drivers", count: driverData?.totalPendingDriver },
    { title: "Approved Drivers", count: driverData?.totalApprovedDriver },
    { title: "Rejected Drivers", count: driverData?.totalRejectedDriver },
    { title: "Currently Online", count: driverData?.totalCurrentOnlineDriver },
    {
      title: "Currently Offline",
      count: driverData?.totalCurrentOfflineDriver,
    },
    { title: "On Trip", count: driverData?.totalCurrentOnTripDriver },
  ];

  return driverCountStats;
};

interface DriverInformation {
  picture?: string;
  name?: string;
  email?: string;
  address?: string;
  gender?: string;
}

interface DriverStatItem {
  title: string;
  image?: string;
  name?: string;
  email?: string;
  address?: string;
  gender?: string;
}

interface DriverStatsData {
  highestEaringDriver?: {
    driverInformation?: DriverInformation;
  };
  lowestEaringDriver?: {
    driverInformation?: DriverInformation;
  };
  highestRatingDriver?: {
    driverInformation?: DriverInformation;
  };
  lowestRatingDriver?: {
    driverInformation?: DriverInformation;
  };
}

export const driverStatsFunction = (driverData: DriverStatsData): DriverStatItem[] => {
  const driverStats: DriverStatItem[] = [
    {
      title: "Highest Earing Driver",
      image: driverData?.highestEaringDriver?.driverInformation?.picture,
      name: driverData?.highestEaringDriver?.driverInformation?.name,
      email: driverData?.highestEaringDriver?.driverInformation?.email,
      address: driverData?.highestEaringDriver?.driverInformation?.address,
      gender: driverData?.highestEaringDriver?.driverInformation?.gender,
    },
    {
      title: "Lowest Earing Driver",
      image: driverData?.lowestEaringDriver?.driverInformation?.picture,
      name: driverData?.lowestEaringDriver?.driverInformation?.name,
      email: driverData?.lowestEaringDriver?.driverInformation?.email,
      address: driverData?.lowestEaringDriver?.driverInformation?.address,
      gender: driverData?.lowestEaringDriver?.driverInformation?.gender,
    },
    {
      title: "Highest Rating Driver",
      image: driverData?.highestRatingDriver?.driverInformation?.picture,
      name: driverData?.highestRatingDriver?.driverInformation?.name,
      email: driverData?.highestRatingDriver?.driverInformation?.email,
      address: driverData?.highestRatingDriver?.driverInformation?.address,
      gender: driverData?.highestRatingDriver?.driverInformation?.gender,
    },
    {
      title: "Lowest Rating Driver",
      image: driverData?.lowestRatingDriver?.driverInformation?.picture,
      name: driverData?.lowestRatingDriver?.driverInformation?.name,
      email: driverData?.lowestRatingDriver?.driverInformation?.email,
      address: driverData?.lowestRatingDriver?.driverInformation?.address,
      gender: driverData?.lowestRatingDriver?.driverInformation?.gender,
    },
  ];

  return driverStats;
};
