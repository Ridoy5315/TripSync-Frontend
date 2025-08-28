import { useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Cancel() {
  const [searchParams] = useSearchParams();

  const transactionId = searchParams.get("transactionId");
  const message =
    searchParams.get("message") || "Payment was cancelled or failed.";
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className=" shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <XCircle className="text-primary mx-auto mb-4" size={48} />
        <h1 className="text-2xl font-bold text-primary mb-2">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground mb-4">{message}</p>
        <p>
          <span className="font-semibold text-pretty">Status:</span> {status}
        </p>

        <div className="text-left text-sm text-pretty space-y-1 mb-6">
          {transactionId && (
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              {transactionId}
            </p>
          )}
          {amount && (
            <p>
              <span className="font-semibold">Amount:</span> ${amount}
            </p>
          )}
        </div>

        <div className=" p-4 rounded-md text-sm mb-6">
          <p>
            <strong>Don’t miss out!</strong> Complete your payment to unlock the
            service or benefit you’ve selected.
          </p>
          <p className="mt-1">
            You can always retry securely. We’re here if you need any help.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <a
            href="/payment"
            className="text-pretty px-4 py-2 rounded-md  transition"
          >
            Retry Payment
          </a>
          <a href="/" className=" hover:underline text-sm">
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}
