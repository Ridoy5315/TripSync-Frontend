import Logo from "@/assets/companyLogo/company_logo.png";
export default function CompanyBackground() {
  return (
    <div className="container mx-auto lg:my-24 md:my-16 my-14 md:px-8 px-6 lg:px-0">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center lg:gap-20 gap-6">
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
          <img className="lg:h-36 lg:w-36 h-20 w-20" src={Logo} alt="" />
          <h2 className=" text-5xl font-bold text-gray-900 dark:text-gray-100">
            TripSync
          </h2>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-10 gap-6">
        <div className="lg:mt-28 md:mt-28 mt-20 space-y-6">
          <h3 className="text-pretty font-semibold lg:text-3xl md:text-3xl text-2xl">What We Offer</h3>
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
        <div className="lg:mt-28 md:mt-28 mt-10 space-y-6">
          <h3 className="text-pretty font-semibold lg:text-3xl md:text-3xl text-2xl">
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
