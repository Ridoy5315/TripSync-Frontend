import { CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Success() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className=" shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
            <CheckCircle className="text-primary mx-auto mb-4" size={48} />
            <h1 className="text-2xl font-bold text-primary mb-2">Payment Successful</h1>
            <p className="text-muted-foreground mb-6">A confirmation email has been sent to your inbox.</p>

            <div className="text-left space-y-2">
              <p><span className="font-semibold text-pretty">Transaction ID:</span> {transactionId}</p>
              <p><span className="font-semibold text-pretty">Message:</span> {message}</p>
              <p><span className="font-semibold text-pretty" >Amount:</span> ${amount}</p>
              <p><span className="font-semibold text-pretty">Status:</span> {status}</p>
            </div>

            <Button className="mt-6">
               <Link to={`/user/ride/details/${id}`}>Go to Home</Link>
            </Button>
          </div>
        </div>

  );
}
