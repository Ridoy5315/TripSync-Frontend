import Logo from "@/assets/companyLogo/company_logo.png";
export default function CompanyBackground() {
  return (
    <div className="container mx-auto my-24 px-10">
      <div className="grid grid-cols-2 items-center gap-20">
        <div className="space-y-3">
          <h3 className="text-pretty font-semibold text-3xl">About TripSync</h3>
          <p className="text-muted-foreground text-justify">
            TripSync is a modern ride-sharing platform designed to make travel
            safe, fast, and convenient. Whether it’s a daily commute, a business
            trip, or a weekend getaway, TripSync connects riders with verified
            drivers for a seamless journey.
          </p>
        </div>
        <div
          className="max-w-lg h-52 flex items-center justify-center gap-10 rounded-2xl 
                bg-gray-100 dark:bg-gray-800 shadow-md"
        >
          <img className="h-36 w-36" src={Logo} alt="" />
          <h2 className=" text-5xl font-bold text-gray-900 dark:text-gray-100">
            TripSync
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="mt-28 space-y-6">
          <h3 className="text-pretty font-semibold text-3xl">What We Offer</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Reliable Rides:</strong> Verified drivers ensure a safe
              and comfortable trip.
            </li>
            <li>
              <strong>Affordable Pricing:</strong> Transparent fares with no
              hidden charges.
            </li>
            <li>
              <strong>User-Friendly App:</strong> Easy booking, tracking, and
              payment in one place.
            </li>
            <li>
              <strong>24/7 Support:</strong> Always here to help riders and
              drivers.
            </li>
            <li>
              <strong>Driver Opportunities:</strong> Flexible earning options
              for drivers.
            </li>
          </ul>
        </div>
        <div className="mt-28 space-y-6">
          <h3 className="text-pretty font-semibold text-3xl">
            Why Riders Love TripSync
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Safety & Comfort:</strong> Every ride is tracked and
              drivers are background-checked.
            </li>
            <li>
              <strong>Seamless Experience:</strong> Quick bookings, accurate
              ETAs, and multiple payment options.
            </li>
            <li>
              <strong>Smart & Efficient:</strong> Technology-driven platform for
              smooth, hassle-free travel.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
