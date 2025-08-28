import { useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Fail() {
     const [searchParams] = useSearchParams();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
     <div className="min-h-screen flex items-center justify-center px-4">
      <div className=" shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <XCircle className="text-primary mx-auto mb-4" size={48} />
        <h1 className="text-2xl font-bold text-primary mb-2">Payment Failed</h1>
        <p className="text-muted-foreground mb-6">
          Unfortunately, your payment did not go through.
        </p>

        <div className="text-left text-sm space-y-2 mb-6">
          <p><span className="font-semibold text-pretty">Transaction ID:</span> {transactionId || "N/A"}</p>
          <p><span className="font-semibold text-pretty">Message:</span> {message || "Unknown Error"}</p>
          <p><span className="font-semibold text-pretty">Amount:</span> ${amount || "0.00"}</p>
          <p><span className="font-semibold text-pretty">Status:</span> {status || "Failed"}</p>
        </div>

        <p className="text-gray-700 font-medium mb-4">
          Don’t worry — these things happen. You can try again and complete your payment securely.
        </p>

        <a
          href="/payment/retry"
          className="inline-block px-5 py-2 rounded-md transition"
        >
          Try Again
        </a>
      </div>
    </div>
  )
}
