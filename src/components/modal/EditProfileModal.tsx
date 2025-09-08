import { useState } from "react";
import SingleImageUploader from "../SingleImageUploader";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditProfileMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const editProfileSchema = z.object({
  name: z
    .string()
    .min(5, { error: "Name must be at least 5 characters" })
    .max(40, { error: "Name is too long" })
    .optional(),
  phone: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8}|\+861[3-9]\d{9}|1[3-9]\d{9})$/, {
      message: "Phone number must be valid for Bangladesh or China.",
    })
    .optional(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long")
    .optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional().or(z.literal("")),
});

export default function EditProfileModal({ userData }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [editProfile, {isLoading}] = useEditProfileMutation();

  const gender = [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    },
  ];

  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: userData?.name,
      phone: userData?.phone,
      address: userData?.address,
      gender: userData?.gender as unknown as "MALE" | "FEMALE",
    },
  });

  const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name ?? "");
    formData.append("phone", data.phone ?? "");
    formData.append("address", data.address ?? "");
    formData.append("gender", data.gender ?? "");
    if (image) formData.append("file", image as File);

    //     const toastId = toast.loading("Updating...");

    try {
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const res = await editProfile({
        userId: userData?._id,
        profileData: formData,
      }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Profile updated successfully ✅");
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="lg:text-sm text-xs">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-division"
            className="lg:space-y-8 md:space-y-8 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-6 gap-3">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Tour Type Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-6 gap-3">
              {/* address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:mb-2 md:mb-2 mb-1">Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Divisions</SelectLabel>
                          {gender?.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
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
            </div>
          </form>
          <SingleImageUploader onChange={setImage}></SingleImageUploader>
        </Form>
        <DialogFooter className="flex flex-row">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isLoading} type="submit" form="add-division">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
