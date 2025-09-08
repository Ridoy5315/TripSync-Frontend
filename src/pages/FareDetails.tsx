export default function FareDetails() {
  return (
    <div className="container max-w-4xl md:px-8 px-6 lg:px-0 mx-auto lg:space-y-8 md:space-y-8 space-y-4 lg:mt-28 md:mt-16 mt-10 mb-10">
      <div className="text-center">
        <h1 className="lg:text-3xl md:text-3xl text-2xl text-pretty font-bold">
          Fare Details
        </h1>
        <p className="text-muted-foreground lg:text-base md:text-base text-sm">
          Understand how your trip fare is calculated
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold">Fare Calculation</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Base Fare:</strong> $13
          </li>
          <li>
            <strong>Distance Rate:</strong> $5 per km
          </li>
          <li>
            <strong>Formula:</strong> Total Fare = Base Fare + (Distance × Per
            Km Rate)
          </li>
        </ul>
        <p className="text-muted-foreground mt-2">
          Example: 10 km ride = 13 + (10 × 5) = <strong>$63</strong>
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-2">
        <h2 className="text-xl font-semibold">Driver Earnings</h2>
        <p className="text-muted-foreground">
          Drivers earn 80% of the total fare.
        </p>
        <p className="text-muted-foreground">
          Example: Total Fare = $63 → Driver Earnings = $50.40
        </p>
      </div>

      <div className="text-muted-foreground text-sm text-center">
        Note: Prices may vary due to traffic, route, or surge pricing. All fares
        are transparent.
      </div>
    </div>
  );
}
