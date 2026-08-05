import { X } from "lucide-react";

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
}

const CreateOrderModal = ({
  open,
  onClose,
  mode = "create",
}: CreateOrderModalProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <h2 className="text-2xl font-bold text-white">
            {mode === "create"
              ? "Create Order"
              : "Edit Order"}
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
            label="Customer Email"
            type="email"
          />

          <Input label="Order ID" />

          <Input
            label="Amount ($)"
            type="number"
          />

          <Input label="Country" />

          <Select
            label="Template"
            options={[
              "Business Pro",
              "Portfolio X",
              "Restaurant Deluxe",
              "Agency Modern",
              "Education Plus",
            ]}
          />

          <Select
            label="Payment Method"
            options={[
              "Stripe",
              "PayPal",
              "Razorpay",
            ]}
          />

          <Select
            label="Payment Status"
            options={[
              "Paid",
              "Pending",
              "Failed",
            ]}
          />

          <Select
            label="Order Status"
            options={[
              "Completed",
              "Processing",
              "Cancelled",
            ]}
          />

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:border-violet-500"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500">

            {mode === "create"
              ? "Create Order"
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
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-violet-500"
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

      <select className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-violet-500">

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

export default CreateOrderModal;