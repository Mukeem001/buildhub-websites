import React from "react";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  ArrowUpDown,
} from "lucide-react";

interface OrdersHeaderProps {
  search: string;
  status: string;
  payment: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPaymentChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onCreateOrder: () => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  search,
  status,
  payment,
  sortBy,
  onSearchChange,
  onStatusChange,
  onPaymentChange,
  onSortChange,
  onCreateOrder,
}) => {
  return (
    <div className="space-y-6">

      {/* Top */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Orders
          </h1>

          <p className="text-zinc-400 mt-1">
            Manage customer orders and payments.
          </p>
        </div>

        <button
          onClick={onCreateOrder}
          className="flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-5 py-3 text-white font-medium transition"
        >
          <Plus size={18} />

          Create Order
        </button>

      </div>

      {/* Filters */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-10 pr-4 py-3 text-white outline-none focus:border-violet-600"
            />

          </div>

          {/* Order Status */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-3 top-3 text-zinc-500"
            />

            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-10 pr-4 py-3 text-white outline-none"
            >
              <option value="">All Status</option>

              <option value="Completed">
                Completed
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

          {/* Payment */}

          <div>

            <select
              value={payment}
              onChange={(e) => onPaymentChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white outline-none"
            >
              <option value="">All Payments</option>

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Failed">
                Failed
              </option>

            </select>

          </div>

          {/* Date */}

          <div className="relative">

            <Calendar
              size={18}
              className="absolute left-3 top-3 text-zinc-500"
            />

            <input
              type="date"
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-10 pr-4 py-3 text-white outline-none"
            />

          </div>

          {/* Sort */}

          <div className="relative">

            <ArrowUpDown
              size={18}
              className="absolute left-3 top-3 text-zinc-500"
            />

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-10 pr-4 py-3 text-white outline-none"
            >
              <option value="latest">
                Latest
              </option>

              <option value="amount">
                Amount
              </option>

              <option value="customer">
                Customer
              </option>

            </select>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrdersHeader;