import { X, ShoppingBag } from "lucide-react";

interface OrderDrawerProps {
  open: boolean;
  onClose: () => void;
}

const OrderDrawer = ({
  open,
  onClose,
}: OrderDrawerProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-violet-600/20 p-3">
              <ShoppingBag className="h-6 w-6 text-violet-400" />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Order Details
              </h2>

              <p className="text-sm text-zinc-400">
                View complete order information
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

        {/* Body */}

        <div className="flex-1 space-y-6 overflow-y-auto p-6">

          {/* Customer */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

            <h3 className="mb-4 text-lg font-semibold text-white">
              Customer
            </h3>

            <div className="space-y-3">

              <InfoRow
                label="Name"
                value="John Doe"
              />

              <InfoRow
                label="Email"
                value="john@example.com"
              />

              <InfoRow
                label="Country"
                value="United States"
              />

            </div>

          </div>

          {/* Order */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

            <h3 className="mb-4 text-lg font-semibold text-white">
              Order
            </h3>

            <div className="space-y-3">

              <InfoRow
                label="Order ID"
                value="#ORD-10024"
              />

              <InfoRow
                label="Template"
                value="Business Pro"
              />

              <InfoRow
                label="Amount"
                value="$79"
              />

            </div>

          </div>

          {/* Payment */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

            <h3 className="mb-4 text-lg font-semibold text-white">
              Payment
            </h3>

            <div className="space-y-3">

              <InfoRow
                label="Method"
                value="Stripe"
              />

              <InfoRow
                label="Status"
                value="Paid"
              />

              <InfoRow
                label="Transaction"
                value="TXN-92837482"
              />

            </div>

          </div>

          {/* Timeline */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

            <h3 className="mb-4 text-lg font-semibold text-white">
              Timeline
            </h3>

            <div className="space-y-3">

              <InfoRow
                label="Created"
                value="05 Jul 2026"
              />

              <InfoRow
                label="Updated"
                value="06 Jul 2026"
              />

              <InfoRow
                label="Status"
                value="Completed"
              />

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            Close
          </button>

        </div>

      </div>
    </>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-none last:pb-0">

      <span className="text-zinc-400">
        {label}
      </span>

      <span className="font-medium text-white">
        {value}
      </span>

    </div>
  );
}

export default OrderDrawer;