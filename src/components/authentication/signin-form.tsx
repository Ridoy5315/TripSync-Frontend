import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import signInLottieData from "@/assets/lottie/Login (1).json";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignInMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import config from "@/config";

const signInSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
  })

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [signin] = useSignInMutation();
    const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await signin(userInfo).unwrap()
      console.log(result)
      toast.success("User log in successfully")
      navigate("/")
    } catch (error) {
      console.log(error)
      if(error.data.message === "User is not verified"){
        toast.error("Your account is not verified")
        navigate("/verify", {state: data.email})
      }
      if(error.data.message === "Incorrect Password"){
        toast.error("Incorrect Password")
      }
      if(error.data.message === "User is deleted"){
        toast.error("You deleted your account")
        navigate("/account-deleted", {state: data.email})
      }
      if(error.data.message === "User is BLOCKED"){
        toast.error("Your account has been blocked")
        navigate("/account-blocked", {state: data.email})
      }
      if(error.data.message === "User is INACTIVE"){
        toast.error("Your account is User is Inactive")
        navigate("/account-inactive", {state: data.email})
      }
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Sign in to your <span className="text-primary">TripSync</span> account
                    </p>
                  </div>
               
                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@tripsync.com"
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
                  {/* password */}
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
                  <Button type="submit" className="w-full cursor-pointer">
                    Sign In
                  </Button>
                </div>
              </form>
            </Form>
            <div className="space-y-4">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <Button onClick={() => window.open(`${config.baseUrl}/auth/google`)} variant="outline" type="button" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signUp" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Lottie animationData={signInLottieData}></Lottie>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
