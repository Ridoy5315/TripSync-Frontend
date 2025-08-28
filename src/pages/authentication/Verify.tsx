import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const [email] = useState(location.state);
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(120);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP");
    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("OTP send successfully", {id: toastId});
      }
      setConfirmed(true);
      setTimer(120);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    const userInfo = {
     email,
     otp: data.pin
    };

    const toastId = toast.loading("Verifying OTP");

    try {
     const res = await verifyOtp(userInfo).unwrap();
     if(res.success){
          toast.success("OTP verified", {id: toastId})
          navigate("/signin");
     }
    } catch (error) {
     console.log(error)
     if(error?.data?.message === "OTP not matching"){
      toast.error("Wrong OTP", {id: toastId})
     }
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (<Card>
        <CardHeader>
          <CardTitle>Verify your account</CardTitle>
          <CardDescription>
            Please enter the 6 digit code we sent to <span className="text-primary">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="otp-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Button
              onClick={handleSendOtp}
              form="otp-form"
              type="button"
              variant="link"
              disabled={timer !== 0}
              className={cn("p-0 m-0", {
               "cursor-pointer": timer === 0,
               "text-gray-500": timer !== 0,
              })}
            >
              Resent OTP: 
            </Button>
            <span className="pl-2">{timer}</span>
          </div>
          <Button form="otp-form" type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>) : (<Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will sent you an OTP at <span className="text-primary">{email}</span>
              
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button onClick={handleSendOtp} className="w-[300px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>)}
    </div>
  );
}
