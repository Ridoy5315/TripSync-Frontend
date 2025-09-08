export default function Mission() {
  return (
    <div className="container mx-auto px-10 my-16">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center">
        <h3 className="lg:text-4xl md:text-4xl text-3xl font-semibold text-pretty text-center">
          Our Mission
        </h3>
        <p className="text-muted-foreground max-w-xl text-justify text-lg lg:mt-0 md:mt-0 mt-2">
          At TripSync, our mission is to transform the way people travel. We aim
          to provide a platform where safety, convenience, and affordability
          come together to create a seamless ride-sharing experience for riders
          and drivers alike.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 my-28">
        <h2 className="lg:text-4xl md:text-4xl text-2xl font-bold text-center lg:mb-12 md:mb-12 mb-8">
          Our Core Mission Points
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-8 gap-4">
          {/* Safety First */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🛡️</span>
              <h3 className="text-xl font-semibold">Safety First</h3>
            </div>
            <p>
              All trips are tracked in real-time, and drivers undergo thorough
              background checks to ensure a secure experience.
            </p>
          </div>

          {/* Reliable Travel */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">⏱️</span>
              <h3 className="text-xl font-semibold">Reliable Travel</h3>
            </div>
            <p>
              Whether it’s a daily commute or a long-distance journey, we ensure
              riders reach their destinations on time, with professional drivers
              and well-maintained vehicles.
            </p>
          </div>

          {/* Smart & User-Friendly */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📱</span>
              <h3 className="text-xl font-semibold">Smart & User-Friendly</h3>
            </div>
            <p>
              Our technology makes booking, tracking, and paying for rides
              simple and intuitive, saving time and reducing travel stress.
            </p>
          </div>

          {/* Empower Drivers */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">💼</span>
              <h3 className="text-xl font-semibold">Empower Drivers</h3>
            </div>
            <p>
              TripSync provides flexible earning opportunities and transparent
              processes for drivers, supporting their growth and livelihood.
            </p>
          </div>

          {/* Sustainable & Community-Oriented */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🌱</span>
              <h3 className="text-xl font-semibold">
                Sustainable & Community-Oriented
              </h3>
            </div>
            <p>
              We are committed to creating smarter, efficient, and eco-friendly
              transportation solutions that benefit the community and the
              environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
