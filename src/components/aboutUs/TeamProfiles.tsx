import { Link } from "react-router-dom";
import photo from "@/assets/DSC_1654.jpg"
import photo1 from "@/assets/testimonials/men1.webp"
import photo2 from "@/assets/testimonials/women1.jpg"

export default function TeamProfiles() {
  return (
    <div className="container mx-auto px-4 mt-16 mb-36">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-pretty text-center mb-4">Meet Our Team</h2>
      <p className="max-w-xl mx-auto text-center text-muted-foreground mb-12">
        Our team is passionate, innovative, and dedicated to making TripSync the
        best ride-sharing platform.
      </p>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 gap-4">
        {/* Team Member Card */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 text-center shadow hover:shadow-lg transition">
          <img
            src={photo}
            alt="Jane Doe"
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-1 text-pretty">
            MD MAHBUBUL ISLAM RIDOY
          </h3>
          <p className="text-muted-foreground  mb-2">CEO & Founder</p>
          <div className="flex justify-center space-x-4">
            <Link className="text-gray-500 hover:text-blue-500">
              🔗
            </Link>
            <Link className="text-gray-500 hover:text-blue-500">
              🔗
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 text-center shadow hover:shadow-lg transition">
          <img
            src={photo1}
            alt="Jane Doe"
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-1 text-pretty">
            Harper Robinson
          </h3>
          <p className="text-muted-foreground  mb-2">COO</p>
          <div className="flex justify-center space-x-4">
            <Link className="text-gray-500 hover:text-blue-500">
              🔗
            </Link>
            <Link className="text-gray-500 hover:text-blue-500">
              🔗
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 text-center shadow hover:shadow-lg transition">
          <img
            src={photo2}
            alt="Jane Doe"
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-1 text-pretty">
            Evelyn Lewis
          </h3>
          <p className="text-muted-foreground  mb-2">Engineering Manager</p>
          <div className="flex justify-center space-x-4">
            <Link className="text-gray-500 hover:text-blue-500">
              🔗
            </Link>
            <Link className="text-gray-500 hover:text-blue-500">
              🔗
            </Link>
          </div>
        </div>

        {/* Repeat cards for each team member */}
      </div>
    </div>
  );
}
