import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import { Order } from "../types/order";

interface OrdersTableProps {
  orders: Order[];

  search: string;
  status: string;
  payment: string;
  sortBy: string;

  selectedIds: number[];
  setSelectedIds: React.Dispatch<
    React.SetStateAction<number[]>
  >;

  onViewOrder: () => void;
  onEditOrder: () => void;
  onDeleteOrder: () => void;
}

const ITEMS_PER_PAGE = 5;

const orderStatusColor: Record<string, string> = {
  Completed:
    "bg-green-500/10 text-green-400 border-green-500/20",

  Processing:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

  Cancelled:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

const paymentStatusColor: Record<string, string> = {
  Paid:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

  Pending:
    "bg-orange-500/10 text-orange-400 border-orange-500/20",

  Failed:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

const OrdersTable = ({
  orders,

  search,
  status,
  payment,
  sortBy,

  selectedIds,
  setSelectedIds,

  onViewOrder,
  onEditOrder,
  onDeleteOrder,
}: OrdersTableProps) => {

  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, payment, sortBy]);

  // Filter

  const filteredOrders = orders.filter(
    (order) => {

      const query =
        search.toLowerCase();

      const matchesSearch =
        order.customerName
          .toLowerCase()
          .includes(query) ||

        order.customerEmail
          .toLowerCase()
          .includes(query) ||

        order.orderId
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "" ||
        order.orderStatus === status;

      const matchesPayment =
        payment === "" ||
        order.paymentStatus === payment;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    }
  );

  // Sort

  const sortedOrders = [
    ...filteredOrders,
  ].sort((a, b) => {

    switch (sortBy) {

      case "amount":
        return b.amount - a.amount;

      case "customer":
        return a.customerName.localeCompare(
          b.customerName
        );

      default:
        return (
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
        );
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedOrders.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedOrders =
    sortedOrders.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage *
        ITEMS_PER_PAGE
    );

  const allSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((order) =>
      selectedIds.includes(order.id)
    );

  const toggleSelectAll = () => {

    if (allSelected) {

      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !paginatedOrders.some(
              (order) =>
                order.id === id
            )
        )
      );

    } else {

      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...paginatedOrders.map(
            (order) =>
              order.id
          ),
        ]),
      ]);

    }

  };

  const toggleSelect = (
    id: number
  ) => {

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) =>
              item !== id
          )
        : [...prev, id]
    );

  };



    return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          {/* Header */}

          <thead className="bg-zinc-950">

            <tr className="border-b border-zinc-800">

              <th className="w-14 px-6 py-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 cursor-pointer accent-violet-600"
                />
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Template
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Payment
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm text-zinc-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {paginatedOrders.length > 0 ? (

              paginatedOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
                >

                  {/* Checkbox */}

                  <td className="px-6 py-5">

                    <input
                      type="checkbox"
                      checked={selectedIds.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                      className="h-4 w-4 cursor-pointer accent-violet-600"
                    />

                  </td>

                  {/* Customer */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={order.avatar}
                        alt={order.customerName}
                        className="h-11 w-11 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="font-semibold text-white">
                          {order.customerName}
                        </h3>

                        <p className="text-sm text-zinc-400">
                          {order.customerEmail}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Order ID */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="rounded-xl bg-violet-600/20 p-2">

                        <ShoppingBag className="h-5 w-5 text-violet-400" />

                      </div>

                      <span className="font-medium text-white">
                        {order.orderId}
                      </span>

                    </div>

                  </td>

                  {/* Template */}

                  <td className="px-6 py-5 text-zinc-300">
                    {order.templateName}
                  </td>

                  {/* Amount */}

                  <td className="px-6 py-5 font-semibold text-white">
                    ${order.amount}
                  </td>

                  {/* Payment */}

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-lg border px-3 py-1 text-sm ${
                        paymentStatusColor[order.paymentStatus]
                      }`}
                    >
                      {order.paymentStatus}
                    </span>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-lg border px-3 py-1 text-sm ${
                        orderStatusColor[order.orderStatus]
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={onViewOrder}
                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={onEditOrder}
                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={onDeleteOrder}
                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  No orders found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
            {/* Pagination */}

      <div className="flex flex-col gap-4 border-t border-zinc-800 px-6 py-4 md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-zinc-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {paginatedOrders.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {sortedOrders.length}
          </span>{" "}
          orders
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-violet-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                  currentPage === index + 1
                    ? "bg-violet-600 text-white"
                    : "border border-zinc-700 text-zinc-300 hover:border-violet-500 hover:bg-zinc-800"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage((page) => page + 1)
            }
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-violet-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default OrdersTable;