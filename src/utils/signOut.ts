import { authApi } from "@/redux/features/auth/auth.api";

import { toast } from "sonner";



export const handleSignOut = async (signOut, dispatch, navigate) => {
  const toastId = toast.loading("Signing out...");
  try {
    const res = await signOut(undefined);
    console.log(res);
    dispatch(authApi.util.resetApiState());
    if (res.data.message === "User Logged out Successfully") {
      toast.success("✅ Signed out successfully.", { id: toastId });
    }
    navigate("/signin");
  } catch (error) {
    console.log(error);
    toast.error("Failed to Signed out.", { id: toastId });
  }
};
