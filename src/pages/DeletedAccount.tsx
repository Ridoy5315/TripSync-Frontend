import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function DeletedAccount() {
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
        <h2 className="text-3xl text-pretty">❌ Account Deleted</h2>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground">
          It looks like you previously deleted your account.
        </p>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground">
          For security and privacy reasons, deleted accounts cannot be
          recovered.
        </p>
        <DropdownMenuSeparator />
        <p className="text-pretty">
          👉 But you're always welcome back! Simply create a new account to get
          started again.
        </p>
      </div>
    </div>
  );
}
