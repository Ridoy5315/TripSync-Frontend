import { Button } from "@/components/ui/button";
import { authApi, useSignOutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Unauthorized() {
     const [signOut] = useSignOutMutation();
       const dispatch = useAppDispatch();
         const navigate = useNavigate()

     const handleSignOut = async () => {
      const toastId = toast.loading("Signing out...");
      try {
        const res = await signOut(undefined);
         console.log(res)
         dispatch(authApi.util.resetApiState());
         if(res.data.message === "User Logged out Successfully"){
          toast.success("✅ Signed out successfully.", {id: toastId})
         }
         navigate("/signin")
       }
       catch (error) {
        console.log(error)
        toast.error("Failed to Signed out.", {id: toastId})
      }
    }    
  return (
    <div className="grid place-content-center h-screen">
      <div className="border border-y-4 border-primary px-14 py-6 flex flex-col gap-2">
        <h2 className="text-3xl text-pretty">Unauthorized</h2>
    
        <p className="text-muted-foreground">
          You are not authorized to access this page
        </p>

        
       <div className="flex gap-2">
          <Button variant="link"type="button" className=""><Link to="/">Go Back To Home</Link></Button>
          <Button variant="link"type="button" className="cursor-pointer" onClick={handleSignOut}>Signout</Button>
       </div>
      </div>
    </div>
  )
}
