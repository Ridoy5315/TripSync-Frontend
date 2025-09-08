import z from "zod";
import { Button } from "../ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, { error: "Password is too short" }),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "❌ Passwords don't match.",
    path: ["confirmPassword"],
  });

export default function ChangePasswordModal() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    const passwordInfo = {
      oldPassword: data?.oldPassword,
      newPassword: data?.password,
    };

    const toastId = toast.loading("Please wait, saving changes...");

    try {
      console.log(passwordInfo);
      const res = await changePassword(passwordInfo).unwrap();
      console.log(res);

      if (res.success) {
        toast.success("Your password has been changed.", { id: toastId });
        setOpen(false);
      }

    } catch (error) {
      console.log(error);
      if(error.data.message === 'Incorrect your current password'){

        toast.error("Incorrect your current password.", {id: toastId})
      }
      if(error.data.message === 'You cant set the same password'){

        toast.error("You cant set the same password.", {id: toastId})
      }
      // toast.error("Failed to update password. Please try again.", {
      //   id: toastId,
      // });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="lg:text-sm text-xs">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-division"
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-6">
              {/* old password */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* new password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* confirm new password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your confirm password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isLoading} type="submit" form="add-division">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>}
            Confirm Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
