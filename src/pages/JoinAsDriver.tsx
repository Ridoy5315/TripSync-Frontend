import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { useApplyDriverMutation } from "@/redux/features/driver/driver.api";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const applyDriverSchema = z.object({
  brand: z
    .string()
    .min(2, { message: "Brand must be at least 2 characters" })
    .max(50, { message: "Brand name is too long" }),
  model: z
    .string()
    .min(1, { message: "Model is required" })
    .max(50, { message: "Model name is too long" }),
  licensePlate: z.string().regex(/^[A-Z0-9-]{2,15}$/, {
    message: "License plate must be valid (e.g., XYZ-1234)",
  }),
  color: z
    .string()
    .min(2, { message: "Color must be at least 2 characters" })
    .max(30, { message: "Color name is too long" }),
  manufacturingYear: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Must be a valid number" })
    .transform((val) => Number(val))
    .refine((val) => val >= 1980 && val <= new Date().getFullYear(), {
      message: `Year must be between 1980 and ${new Date().getFullYear()}`,
    }),
});

export default function JoinAsDriver({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data, isLoading: infoLoading } = useGetOwnInfoQuery(undefined);
  const [applyDriver, { isLoading }] = useApplyDriverMutation();

  const userData = data?.data?.user;

  const form = useForm({
    resolver: zodResolver(applyDriverSchema),
    defaultValues: {
      brand: "",
      model: "",
      licensePlate: "",
      color: "",
      manufacturingYear: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof applyDriverSchema>) => {
    const vehicleInfo = {
      brand: data?.brand,
      model: data?.model,
      licensePlate: data?.licensePlate,
      color: data?.color,
      manufacturingYear: data?.manufacturingYear,
    };

    const toastId = toast.loading("Applying...");

    try {
      const result = await applyDriver({
        userId: userData?._id,
        vehicleInfo,
      }).unwrap();
      console.log(result);

      toast.success(
        "Your driver application has been submitted successfully.",
        { id: toastId }
      );
      //  navigate("/verify", { state: data.email });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto mt-10 mb-44">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <div className="p-6 md:p-8 space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-10 items-center">
                      {infoLoading && (
                        <div className="space-y-3">
                          <h1 className="">
                            <Skeleton className="w-[580px] h-[85px]" />
                          </h1>
                          <p className="">
                            <Skeleton className="w-[350px] h-[50px]" />
                          </p>
                        </div>
                      )}
                      {!infoLoading && (
                        <div className="flex flex-col">
                          <h1 className="text-5xl font-bold">
                            Become a Driver with Trip Sync
                          </h1>
                          <p className="text-muted-foreground text-lg text-balance">
                            Join our network of trusted drivers and start
                            earning on your own schedule.
                          </p>
                        </div>
                      )}
                      {infoLoading && <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-10">
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                        </div>
                       
                        <div className="space-y-10">
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                          <Skeleton className="w-[283px] h-[40px]" />
                        </div>
                       
                        </div>}
                      {!infoLoading && <div className="space-y-7">
                        <div className="grid grid-cols-2 gap-5">
                          {/* Name */}
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Trip Sync"
                                value={userData?.name}
                                disabled
                              />
                            </FormControl>
                          </FormItem>
                          {/* email */}
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="example@tripsync.com"
                                value={userData?.email}
                                disabled
                              />
                            </FormControl>
                          </FormItem>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          {/* Address */}
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Address"
                                value={userData?.address}
                                disabled
                              />
                            </FormControl>
                          </FormItem>
                          {/* phone */}
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="00000000000"
                                value={userData?.phone}
                                disabled
                              />
                            </FormControl>
                          </FormItem>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          {/* date of birth */}
                          <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="0000-00-00"
                                value={userData?.dateOfBirth}
                                disabled
                              />
                            </FormControl>
                          </FormItem>
                          {/* gender */}
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="gender"
                                value={userData?.gender}
                                disabled
                              />
                            </FormControl>
                          </FormItem>
                        </div>

                        {/* Vehicle Info */}

                        <div className="grid grid-cols-2 gap-5">
                          {/* brand */}
                          <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Car Brand</FormLabel>
                                <FormControl>
                                  <Input placeholder="Brand name" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                  This is your public display name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {/* model */}
                          <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Model</FormLabel>
                                <FormControl>
                                  <Input placeholder="Model name" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                  This is your public display name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          {/* color */}
                          <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                  <Input placeholder="Color name" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                  This is your public display name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {/* licensePlate */}
                          <FormField
                            control={form.control}
                            name="licensePlate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>License Plate</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="License plate number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="sr-only">
                                  This is your public display name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          {/* manufacturingYear */}
                          <FormField
                            control={form.control}
                            name="manufacturingYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Manufacturing Year</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Manufacturing year"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="sr-only">
                                  This is your public display name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-end justify-end">
                            <Button
                              disabled={isLoading}
                              type="submit"
                              className="cursor-pointer"
                            >
                              {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                              )}
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>}
                      
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
    //     <div className="container mx-auto mt-28 mb-44 ">

    //     </div>
  );
}
