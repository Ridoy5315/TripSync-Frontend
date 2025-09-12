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
import { useCreateEmergencyContactMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { IErrorResponse } from "@/types";

const emergencyContactSchema = z.object({
  emergencyContact: z.email(),
});

interface AddEmergencyContactModalProps {
  userId: string;
}

export function AddEmergencyContactModal({ userId }: AddEmergencyContactModalProps) {
  const [open, setOpen] = useState(false);
  const [createEmergencyContact, { isLoading }] =
    useCreateEmergencyContactMutation();

  const form = useForm({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      emergencyContact: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof emergencyContactSchema>) => {
    const addEmergencyContact = {
      emergencyContact: data.emergencyContact,
    };

    const toastId = toast.loading("Emergency Contact Adding...");

    try {
      const result = await createEmergencyContact({
        userId,
        addEmergencyContact,
      }).unwrap();

      if(result.success){
        toast.success("Emergency Contact added successfully", { id: toastId });
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
      const err = error as IErrorResponse
      if(err.data.message === "You are not authorized"){
        toast.error("You are not authorized.", {id: toastId})
      }
      if(err.data.message === "User not found"){
        toast.error("Cant find out your profile.", {id: toastId})
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add Emergency Contact</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Email</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="contact"
            className="lg:space-y-8 md:space-y-8 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* email */}
            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@tripsync.com" {...field} />
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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
