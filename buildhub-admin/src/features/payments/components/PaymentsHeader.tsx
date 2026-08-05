import { CreditCard, Plus, Search } from "lucide-react";

interface PaymentsHeaderProps {
  onCreatePayment: () => void;

  search: string;
  status: string;
  method: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMethodChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const PaymentsHeader = ({
  onCreatePayment,
  search,
  status,
  method,
  sortBy,
  onSearchChange,
  onStatusChange,
  onMethodChange,
  onSortChange,
}: PaymentsHeaderProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">

      {/* Top */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-emerald-500/10 p-3">
            <CreditCard className="h-7 w-7 text-emerald-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Payments
            </h1>

            <p className="text-sm text-zinc-400">
              Manage all payment transactions.
            </p>
          </div>
        </div>

        <button
          onClick={onCreatePayment}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500"
        >
          <Plus size={18} />
          Create Payment
        </button>

      </div>

      {/* Search */}
      <div className="relative mb-5">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search payments..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-emerald-500"
        />

      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* Status */}
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
        >
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>

        {/* Method */}
        <select
          value={method}
          onChange={(e) =>
            onMethodChange(e.target.value)
          }
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
        >
          <option value="">All Methods</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Stripe">Stripe</option>
          <option value="Razorpay">Razorpay</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value)
          }
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="customer">Sort by Customer</option>
          <option value="status">Sort by Status</option>
        </select>

      </div>

    </div>
  );
};

export default PaymentsHeader;