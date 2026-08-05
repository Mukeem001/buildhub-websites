import { X, CreditCard } from "lucide-react";

interface PaymentDrawerProps {
  open: boolean;
  onClose: () => void;
}

const PaymentDrawer = ({
  open,
  onClose,
}: PaymentDrawerProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-emerald-500/10 p-3">
              <CreditCard className="h-6 w-6 text-emerald-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Payment Details
              </h2>

              <p className="text-sm text-zinc-400">
                View complete payment information
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>

        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">

          <Info label="Customer" value="Ahmad Sheikh" />
          <Info label="Email" value="ahmad@example.com" />
          <Info label="Order ID" value="#ORD1001" />
          <Info label="Transaction ID" value="TXN987654321" />
          <Info label="Amount" value="₹2,499" />
          <Info label="Payment Method" value="UPI" />

          <div>
            <p className="mb-2 text-sm text-zinc-400">
              Status
            </p>

            <span className="rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm font-medium text-green-400">
              Paid
            </span>
          </div>

          <Info
            label="Payment Date"
            value="01 July 2026"
          />

        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            Close
          </button>

        </div>

      </div>
    </>
  );
};

interface InfoProps {
  label: string;
  value: string;
}

function Info({
  label,
  value,
}: InfoProps) {
  return (
    <div>

      <p className="mb-2 text-sm text-zinc-400">
        {label}
      </p>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white">
        {value}
      </div>

    </div>
  );
}

export default PaymentDrawer;