import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BellRing, MapPinned, Siren } from "lucide-react";
import { useSendGPSLinkMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";

export default function SOSButtonModal() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gpsLink, setGpsLink] = useState<string | null>(null);
  const [sendGPSLink] = useSendGPSLinkMutation()

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setPosition([lat, lng]);

        // Generate Google Maps GPS link
      const link = `https://www.google.com/maps?q=${lat},${lng}`;
      setGpsLink(link);

      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission denied.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out.");
            break;
          default:
            setError("An unknown error occurred.");
        }
      }
    );
  }, []);

  const handleSendGPSLink = async() => {
    const toastId = toast.loading("Sending...");

    try {
      const res = await sendGPSLink({gpsLink}).unwrap()
      console.log(res);
      if(res.success){
        toast.success("✅ SOS alert sent successfully.", {id: toastId})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer lg:!h-9 md:!h-8 !h-7 lg:text-sm text-xs md:px-2 px-1 lg:px-4">
          Send SOS
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-2xl md:max-w-2xl max-w-sm">
        <DialogHeader>
          <DialogTitle>SOS Location</DialogTitle>
        </DialogHeader>
        <div className="lg:h-[500px] md:h-[350px] h-[300px] w-full">
          {position ? (
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>You are here 📍</Popup>
              </Marker>
            </MapContainer>
          ) : ( <div className="flex items-center justify-center h-full text-red-500">
              {error || "Fetching your location..."}
            </div>)}
        </div>
        <div className="lg:flex md:flex grid gap-2 mx-auto">
          <Button variant="destructive" className="cursor-pointer lg:text-sm md:text-sm  text-xs !px-2 lg:!px-4 md:!px-4" >
            <Siren />Call Police
          </Button>
          <Button variant="destructive" className="cursor-pointer lg:text-sm md:text-sm  text-xs !px-2 lg:!px-4 md:!px-4" onClick={handleSendGPSLink}>
            <BellRing />Notify Emergency Contact
          </Button>
          <Button variant="destructive" className="cursor-pointer lg:text-sm md:text-sm  text-xs !px-2 lg:!px-4 md:!px-4" onClick={handleSendGPSLink}>
            <MapPinned />Share Live Location
          </Button>
        </div>

        <DialogFooter></DialogFooter>
        {/* <DialogFooter>
          {gpsLink && (
            <a
              href={gpsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Open GPS Location
            </a>
          )}
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
