import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRiderFeedbackMutation } from "@/redux/features/ride/ride.api";
import { Loader2 } from "lucide-react";
import type { IErrorResponse } from "@/types";

const feedbackSchema = z.object({
  feedback: z.string(),
  rating: z.coerce.number().min(0, "Invalid rating").max(5, "Invalid rating"),
});

export default function FeedbackModal({ rideId }: { rideId: string }) {
  const [open, setOpen] = useState(false);
  const [riderFeedback, { isLoading }] = useRiderFeedbackMutation();

  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: "",
      rating: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
    const payload = {
      riderFeedback: data.feedback,
      driverRating: data.rating,
    };

    const toastId = toast.loading("Please wait...");

    try {
      const result = await riderFeedback({
        rideId,
        payload,
      }).unwrap();

      if (result.success) {
        toast.success("You has been given feedback to driver successfully", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      const err = error as IErrorResponse;
      if (err.data.message === "You are not correct rider") {
        toast.error("You are not correct rider.", { id: toastId });
      }
      if (err.data.message === "Ride not found") {
        toast.error("Ride not found.", { id: toastId });
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Give Feedback</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Give Rating & Feedback</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="contact"
            className="lg:space-y-8 md:space-y-8 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* feedback */}
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Give Feedback</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write something about driver"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Give Rating
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="rating (0-5)"
                      {...field}
                      value={
                        field.value === undefined || field.value === null
                          ? ""
                          : String(field.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="cursor-pointer max-w-2/10 w-full"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isLoading} type="submit" form="contact">
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
