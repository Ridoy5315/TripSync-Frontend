import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function BlockedAccount() {
  const location = useLocation();
  const [email] = useState(location.state);
  const navigate = useNavigate();

  useEffect(() => {
      if (!email) {
        navigate("/signUp");
      }
    }, [email, navigate]);
  return (
    <div className="grid place-content-center h-screen">
      <div className="border border-y-4 border-primary px-14 py-6 flex flex-col gap-2">
        <h2 className="text-3xl text-pretty">🛑 Account Blocked</h2>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground">
          Your account has been temporarily blocked by the system administrator
          due to policy violations or suspicious activity.
        </p>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground">
          If you believe this is a mistake or would like more information,
          please contact our support team.
        </p>
        <DropdownMenuSeparator />
        <div className="flex gap-4">
          <p>📧 Contact us at: <span className="text-primary">support@tripsync.com </span></p>
          <p>or</p>
          <p> 📞 Call us at: <span className="text-primary">+8613120738728</span></p>
        </div>
      </div>
    </div>
  );
}
