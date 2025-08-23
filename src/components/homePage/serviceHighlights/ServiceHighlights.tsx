import { Button } from "@/components/ui/button";
import { Ban, Car, Eye, ShieldCheck, Wallet } from "lucide-react";

export default function ServiceHighlights() {
  return (
    <div className="container mx-auto lg:px-16 mt-32">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Ride with <span className="text-primary">TripSync?</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col px-8 py-14 rounded-2xl shadow-2xl dark:shadow-sm dark:shadow-primary gap-4">
          <Ban
            size={60}
            color="#8e51fe"
            strokeWidth={1.5}
            className="w-14 h-14"
          />
          <h3 className="text-2xl font-semibold">Transparent Pricing</h3>
          <p className="text-muted-foreground grow-1 leading-7">
            No hidden fees. What you see is what you pay — with full
            transparency, every step of the way.
          </p>
          <Button variant="outline" className="rounded-xl w-auto self-start my-10"><Eye size={52} strokeWidth={1.5} />See more</Button>
        </div>
        <div className="flex flex-col px-8 py-14 rounded-2xl shadow-2xl dark:shadow-sm dark:shadow-primary gap-4">
          <ShieldCheck
            size={60}
            color="#8e51fe"
            strokeWidth={1.5}
            className="w-14 h-14"
          />
          <h3 className="text-2xl font-semibold">Verified Users</h3>
          <p className="text-muted-foreground grow-1 leading-7">
            All TripSync drivers and riders are verified with ID, and contact
            verification — creating a secure and trusted environment for
            everyone.
          </p>
          <Button variant="outline" className="rounded-xl w-auto self-start my-10"><Eye size={52} strokeWidth={1.5} />See more</Button>
        </div>
        <div className="flex flex-col px-8 py-14 rounded-2xl shadow-2xl dark:shadow-sm dark:shadow-primary gap-4">
          <Wallet
            size={60}
            color="#8e51fe"
            strokeWidth={1.5}
            className="w-14 h-14"
          />
          <h3 className="text-2xl font-semibold">Secure Payments</h3>
          <p className="text-muted-foreground grow-1 leading-7">
            Pay effortlessly using your preferred method — including cards,
            digital wallets, or in-app balance. All transactions are encrypted
            for your safety.
          </p>
          <Button variant="outline" className="rounded-xl w-auto self-start my-10"><Eye size={52} strokeWidth={1.5} />See more</Button>
        </div>
        <div className="flex flex-col px-8 py-14 rounded-2xl shadow-2xl dark:shadow-sm dark:shadow-primary gap-4">
          <Car
            size={60}
            color="#8e51fe"
            strokeWidth={1.5}
            className="w-16 h-16"
          />
          <h3 className="text-2xl font-semibold">Top-Quality Cars</h3>
          <p className="text-muted-foreground grow-1 leading-7">
            All vehicles undergo routine maintenance and cleanliness checks to
            guarantee a safe, hygienic, and comfortable ride every time.
          </p>
          <Button variant="outline" className="rounded-xl w-auto self-start my-10"><Eye size={52} strokeWidth={1.5} />See more</Button>
        </div>
      </div>
    </div>
  );
}
