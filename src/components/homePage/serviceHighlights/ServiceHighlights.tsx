import { Ban, Car, ShieldCheck, Wallet } from "lucide-react";

export default function ServiceHighlights() {
  return (
    <div className="container mx-auto lg:px-16 lg:mt-32 md:mt-32 mt-24 px-8">
      <h2 className="md:text-3xl text-2xl lg:text-4xl font-bold text-center mb-8">
        Why Ride with <span className="text-primary">TripSync?</span>
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-6">
        <div className="flex flex-col lg:px-8 px-4 lg:pt-14 md:pt-10 lg:pb-24 md:pb-24 py-8 rounded-2xl shadow-2xl dark:shadow-sm dark:shadow-primary gap-4">
          <Ban
            size={60}
            color="#8e51fe"
            strokeWidth={1.5}
            className="lg:w-14 lg:h-14 md:w-12 md:h-12 w-10 h-10"
          />
          <h3 className="lg:text-2xl md:text-lg font-semibold">Transparent Pricing</h3>
          <p className="text-muted-foreground grow-1 lg:leading-7 md:leading-7 leading-5 md:text-sm lg:text-base text-xs">
            No hidden fees. What you see is what you pay — with full
            transparency, every step of the way.
          </p>
        </div>
        <div className="flex flex-col lg:px-8 px-4 lg:pt-14 md:pt-10 lg:pb-24 md:pb-24 py-8 rounded-2xl shadow-2xl dark:shadow-sm dark:shadow-primary gap-4">
          <ShieldCheck
            size={60}
            color="#8e51fe"
            strokeWidth={1.5}
            className="lg:w-14 lg:h-14 md:w-12 md:h-12 w-10 h-10"
          />
          <h3 className="lg:text-2xl md:text-lg font-semibold">Verified Users</h3>
          <p className="text-muted-foreground grow-1 lg:leading-7 md:leading-7 leading-5 md:text-sm lg:text-base text-xs">
            All TripSync drivers and riders are verified with ID, and contact
            verification — creating a secure and trusted environment for
            everyone.
          </p>
        </div>
        <div className="flex flex-col lg:px-8 px-4 lg:pt-14 md:pt-10 lg:pb-24 md:pb-24 py-8 rounded-2xl shadow-2xl dark:shadow-sm dark:shadow-primary gap-4">
          <Wallet
            size={60}
            color="#8e51fe"
            strokeWidth={1.5}
            className="lg:w-14 lg:h-14 md:w-12 md:h-12 w-10 h-10"
          />
          <h3 className="lg:text-2xl md:text-lg font-semibold">Secure Payments</h3>
          <p className="text-muted-foreground grow-1 lg:leading-7 md:leading-7 leading-5 md:text-sm lg:text-base text-xs">
            Pay effortlessly using your preferred method — including cards,
            digital wallets, or in-app balance. All transactions are encrypted
            for your safety.
          </p>
        </div>
        <div className="flex flex-col lg:px-8 px-4 lg:pt-14 md:pt-10 lg:pb-24 md:pb-24 py-8 rounded-2xl shadow-2xl dark:shadow-sm dark:shadow-primary gap-4">
          <Car
            size={60}
            color="#8e51fe"
            strokeWidth={1.5}
            className="lg:w-14 lg:h-14 md:w-12 md:h-12 w-10 h-10"
          />
          <h3 className="lg:text-2xl md:text-lg font-semibold">Top-Quality Cars</h3>
          <p className="text-muted-foreground grow-1 lg:leading-7 md:leading-7 leading-5 md:text-sm lg:text-base text-xs">
            All vehicles undergo routine maintenance and cleanliness checks to
            guarantee a safe, hygienic, and comfortable ride every time.
          </p>
        </div>
      </div>
    </div>
  );
}
