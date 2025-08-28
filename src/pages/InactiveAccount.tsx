import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function InactiveAccount() {
  const location = useLocation();
  const [email] = useState(location.state);
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/verify", {state: email})
  }

  useEffect(() => {
    if (!email) {
      navigate("/signUp");
    }
  }, [email, navigate]);

  return (
    <div className="grid place-content-center h-screen">
      <div className="border border-y-4 border-primary px-14 py-6 flex flex-col gap-2">
        <h2 className="text-3xl text-pretty">🔒 Your Account is Inactive</h2>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground">
          Your account is currently inactive.
        </p>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground">
          This usually happens if you haven't verified your email address or
          your account was manually deactivated.
        </p>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground">
          To activate your account, please verify your email address.
        </p>
        <DropdownMenuSeparator />
        <p className="text-pretty">
          Click<Button onClick={handleVerify} type="button" variant="link" className="text-lg cursor-pointer">here</Button>to send a verification code to your email.
        </p>
        {/* <Button
              onClick={handleVerify}
              type="button"
              variant="link"
            >
              Resent OTP: 
            </Button> */}
      </div>
    </div>
  );
}
