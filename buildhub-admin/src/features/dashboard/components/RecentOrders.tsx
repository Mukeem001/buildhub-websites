import {
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import type { DashboardOrder } from "@/services/dashboard";

interface RecentOrdersProps {
  orders?: DashboardOrder[];
  loading?: boolean;
}

const statusBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return (
        <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          <CheckCircle2 size={14} />
          Paid
        </span>
      );
    case "Pending":
      return (
        <span className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
          <Clock3 size={14} />
          Pending
        </span>
      );
    default:
      return (
        <span className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
          <XCircle size={14} />
          Failed
        </span>
      );
  }
};

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  const items = orders ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Recent Orders</h2>

        <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-blue-500 hover:text-white">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-sm text-zinc-500">
              <th className="pb-4">Order</th>
              <th className="pb-4">Customer</th>
              <th className="pb-4">Website</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
              <th className="pb-4"></th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
                >
                  <td className="py-4 font-medium text-white">{order.id}</td>
                  <td className="py-4 text-zinc-300">{order.customer}</td>
                  <td className="py-4 text-zinc-400">{order.website}</td>
                  <td className="py-4 font-semibold text-white">{order.amount}</td>
                  <td className="py-4">{statusBadge(order.status)}</td>
                  <td className="py-4">
                    <button className="rounded-lg p-2 transition hover:bg-zinc-800">
                      <MoreHorizontal size={18} className="text-zinc-400" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-6 text-center text-sm text-zinc-400">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
