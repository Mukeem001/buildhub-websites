import { X } from "lucide-react";

interface CreatePaymentModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
}

const CreatePaymentModal = ({
  open,
  onClose,
  mode = "create",
}: CreatePaymentModalProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <h2 className="text-2xl font-bold text-white">
            {mode === "create"
              ? "Create Payment"
              : "Edit Payment"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>

        </div>

        {/* Form */}
        <div className="grid gap-5 p-6 md:grid-cols-2">

          <Input label="Customer Name" />

          <Input
            label="Email"
            type="email"
          />

          <Input label="Order ID" />

          <Input
            label="Transaction ID"
          />

          <Input
            label="Amount"
            type="number"
          />

          <Select
            label="Payment Method"
            options={[
              "UPI",
              "Credit Card",
              "Debit Card",
              "PayPal",
              "Stripe",
              "Razorpay",
            ]}
          />

          <Select
            label="Payment Status"
            options={[
              "Paid",
              "Pending",
              "Failed",
              "Refunded",
            ]}
          />

          <Input
            label="Payment Date"
            type="date"
          />

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:border-emerald-500"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500">
            {mode === "create"
              ? "Create Payment"
              : "Save Changes"}
          </button>

        </div>

      </div>
    </>
  );
};

interface InputProps {
  label: string;
  type?: string;
}

function Input({
  label,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <input
        type={type}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  options: string[];
}

function Select({
  label,
  options,
}: SelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <select className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-emerald-500">
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CreatePaymentModal;