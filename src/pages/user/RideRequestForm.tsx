import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paymentMethod } from "@/utils/paymentMethod";
import { distanceInKm } from "@/utils/findDistanceBetweenLocation";
import { rideFare } from "@/utils/rideFare";
import { useEffect } from "react";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { useRideRequestMutation } from "@/redux/features/ride/ride.api";
import { Loader2 } from "lucide-react";
import type { IResError } from "@/types";

const rideRequestSchema = z.object({
  pickupLat: z.coerce
    .number()
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude"),
  pickupLng: z.coerce
    .number()
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude"),
  destinationLat: z.coerce
    .number()
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude"),
  destinationLng: z.coerce
    .number()
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude"),
  distance: z.string(),
  fareEstimation: z.string(),
  paymentMethod: z.string().min(1, "Please select a payment method"),
});

export default function RideRequestForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data: userData } = useGetOwnInfoQuery(undefined);
  const [rideRequest, {isLoading}] = useRideRequestMutation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(rideRequestSchema),
    defaultValues: {
      pickupLat: 0,
      pickupLng: 0,
      destinationLat: 0,
      destinationLng: 0,
      fareEstimation: "",
      distance: "",
      paymentMethod: "",
    },
  });

  const { watch, setValue } = form;

  const pickupLat = watch("pickupLat");
  const pickupLng = watch("pickupLng");
  const destinationLat = watch("destinationLat");
  const destinationLng = watch("destinationLng");

  useEffect(() => {
    const location = {
      pickupLat: Number(pickupLat),
      pickupLng: Number(pickupLng),
      destinationLat: Number(destinationLat),
      destinationLng: Number(destinationLng),
    };

    const getDistance = distanceInKm(location);
    const getFare = rideFare(getDistance);

    setValue("distance", getDistance.toFixed(2));
    setValue("fareEstimation", Number(getFare).toFixed(2));
  }, [pickupLat, pickupLng, destinationLat, destinationLng, setValue]);

  const onSubmit = async (data: z.infer<typeof rideRequestSchema>) => {
    const pickupLocation = {
      type: "Point",
      coordinates: [data.pickupLng, data.pickupLat],
    };

    const destinationLocation = {
      type: "Point",
      coordinates: [data.destinationLng, data.destinationLat],
    };

    const rideRequestInfo = {
      pickupLocation,
      destinationLocation,
      distance: data.distance,
      originalFare: data.fareEstimation,
      paymentMethod: data.paymentMethod,
    };

    const userId = userData?.data?.user?._id;

    const toastId = toast.loading("Requesting your ride... Please wait.");

    try {
      const response = await rideRequest({ userId, data: rideRequestInfo });

      const res = response as IResError
      // Check if response is an error or success
      if ("error" in res && res.error?.data?.message) {
        const message = res.error.data.message;
        if (message === "Please fulfill your profile first") {
          toast.error("Please complete your profile to proceed.", {
            id: toastId,
          });
        }
        if (message === "User is not verified") {
          toast.error("Your account is not verified", {
            id: toastId,
          });
        }
        if (
          message ===
          "You are already on a trip. Please complete it before requesting another."
        ) {
          toast.error(
            "You are already on a trip. Please complete or cancel it before requesting another.",
            { id: toastId }
          );
        }
        if (
          message ===
            "your request has been pending, but no drivers are available now" 
        ) {
          toast.error(
            "No drivers are available now in your area.",
            { id: toastId }
          );
        }
      } else if ("data" in response && response.data?.success && response.data?.data?.paymentUrl) {
        window.open(`${response.data.data.paymentUrl}`);
        toast.success(
          "Ride requested successfully! Waiting for driver confirmation.",
          { id: toastId }
        );
        navigate("/user/ride/details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col lg:gap-6 gap-3 lg:p-4 md:p-2", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="">
          <div className="lg:p-6 md:p-4 p-2 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="lg:text-2xl text-xl font-bold">Request a Ride</h1>
                    <p className="text-muted-foreground text-balance text-sm lg:text-base">
                      Enter your ride information to get started.
                    </p>
                  </div>
                  {/* pickup and destination fields*/}
                  <div className="grid grid-cols-7 lg:gap-7">
                    {/* pickup location */}
                    <div className="col-span-3 flex flex-col gap-3">
                      <h3 className="lg:text-lg mb-1">Pickup location</h3>
                      {/* pickup latitude */}
                      <FormField
                        control={form.control}
                        name="pickupLat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Pickup latitude
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="pickupLat"
                                {...field}
                                value={field.value === undefined || field.value === null ? "" : String(field.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* pickup longitude */}
                      <FormField
                        control={form.control}
                        name="pickupLng"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Pickup longitude
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="pickupLng"
                                {...field}
                                value={field.value === undefined || field.value === null ? "" : String(field.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="col-span-1 mx-auto"
                    />
                    {/* Destination location */}
                    <div className="col-span-3 flex flex-col gap-3">
                      <h3 className="lg:text-lg mb-1">Destination location</h3>
                      {/* destination latitude */}
                      <FormField
                        control={form.control}
                        name="destinationLat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Destination latitude
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="destinationLat"
                                {...field}
                                value={field.value === undefined || field.value === null ? "" : String(field.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* destination longitude */}
                      <FormField
                        control={form.control}
                        name="destinationLng"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Destination longitude
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="destinationLng"
                                {...field}
                                value={field.value === undefined || field.value === null ? "" : String(field.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Separator className="my-1 lg:my-6" />
                  <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="distance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="">Distance (km)</FormLabel>
                          <FormControl>
                            <Input placeholder="00.00" {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fareEstimation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="">Fare Estimation</FormLabel>
                          <FormControl>
                            <Input placeholder="00.00" {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="lg:mb-2 mb-1">
                            Choose Your Payment Method
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Payment Method</SelectLabel>
                                {paymentMethod?.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end items-end">
                      <Button disabled={isLoading} type="submit" className=" cursor-pointer">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>}
                        Request Ride
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking request, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
