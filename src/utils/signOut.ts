import { authApi } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import type { AppDispatch } from "@/redux/store"; // adjust to your store setup

interface NavigateFunction {
  (path: string): void;
}

export const handleSignOut = async (
  signOut: ReturnType<typeof authApi.useSignOutMutation>[0], 
  dispatch: AppDispatch,
  navigate: NavigateFunction
): Promise<void> => {
  const toastId = toast.loading("Signing out...");
  try {
    const res = await signOut(undefined).unwrap(); 

    dispatch(authApi.util.resetApiState());

    if (res.message === "User Logged out Successfully") {
      toast.success("✅ Signed out successfully.", { id: toastId });
    }
    navigate("/signin");
  } catch (error) {
    console.error(error);
    toast.error("Failed to sign out.", { id: toastId });
  }
};
