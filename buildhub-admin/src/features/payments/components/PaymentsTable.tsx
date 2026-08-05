import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  CreditCard,
} from "lucide-react";

import { Payment } from "../types/payment";

interface PaymentsTableProps {
  payments: Payment[];

  search: string;
  status: string;
  method: string;
  sortBy: string;

  selectedIds: number[];
  setSelectedIds: React.Dispatch<
    React.SetStateAction<number[]>
  >;

  onViewPayment: () => void;
  onEditPayment: () => void;
  onDeletePayment: () => void;
}

const ITEMS_PER_PAGE = 5;

const statusColor: Record<string, string> = {
  Paid:
    "bg-green-500/10 text-green-400 border-green-500/20",

  Pending:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

  Failed:
    "bg-red-500/10 text-red-400 border-red-500/20",

  Refunded:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const PaymentsTable = ({
  payments,
  search,
  status,
  method,
  sortBy,

  selectedIds,
  setSelectedIds,

  onViewPayment,
  onEditPayment,
  onDeletePayment,
}: PaymentsTableProps) => {
  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, method, sortBy]);

  // Filter

  const filteredPayments =
    payments.filter((payment) => {
      const query =
        search.toLowerCase();

      const matchesSearch =
        payment.customer
          .toLowerCase()
          .includes(query) ||
        payment.email
          .toLowerCase()
          .includes(query) ||
        payment.transactionId
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "" ||
        payment.status === status;

      const matchesMethod =
        method === "" ||
        payment.method === method;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod
      );
    });

  // Sort

  const sortedPayments = [
    ...filteredPayments,
  ].sort((a, b) => {
    switch (sortBy) {
      case "amount":
        return b.amount - a.amount;

      case "customer":
        return a.customer.localeCompare(
          b.customer
        );

      case "status":
        return a.status.localeCompare(
          b.status
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
      sortedPayments.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedPayments =
    sortedPayments.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const allSelected =
    paginatedPayments.length > 0 &&
    paginatedPayments.every(
      (payment) =>
        selectedIds.includes(
          payment.id
        )
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !paginatedPayments.some(
              (payment) =>
                payment.id === id
            )
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...paginatedPayments.map(
            (payment) =>
              payment.id
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

          <thead className="bg-zinc-950">

            <tr className="border-b border-zinc-800">

              <th className="w-14 px-6 py-4">

                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={
                    toggleSelectAll
                  }
                  className="h-4 w-4 cursor-pointer accent-emerald-600"
                />

              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Order
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Method
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Date
              </th>

              <th className="px-6 py-4 text-right text-sm text-zinc-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

                      {paginatedPayments.length > 0 ? (
            paginatedPayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                {/* Checkbox */}

                <td className="px-6 py-5">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(payment.id)}
                    onChange={() => toggleSelect(payment.id)}
                    className="h-4 w-4 cursor-pointer accent-emerald-600"
                  />
                </td>

                {/* Customer */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-emerald-600/20 p-3">
                      <CreditCard className="h-5 w-5 text-emerald-400" />
                    </div>

                    <div>

                      <h3 className="font-semibold text-white">
                        {payment.customer}
                      </h3>

                      <p className="text-sm text-zinc-400">
                        {payment.email}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Order */}

                <td className="px-6 py-5">

                  <div>

                    <p className="font-medium text-white">
                      {payment.orderId}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {payment.transactionId}
                    </p>

                  </div>

                </td>

                {/* Amount */}

                <td className="px-6 py-5 font-semibold text-white">
                  ₹{payment.amount.toLocaleString()}
                </td>

                {/* Method */}

                <td className="px-6 py-5">

                  <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {payment.method}
                  </span>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`rounded-lg border px-3 py-1 text-sm ${
                      statusColor[payment.status]
                    }`}
                  >
                    {payment.status}
                  </span>

                </td>

                {/* Date */}

                <td className="px-6 py-5 text-zinc-300">
                  {payment.createdAt}
                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={onViewPayment}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={onEditPayment}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={onDeletePayment}
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
                No payments found.
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
            {paginatedPayments.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {sortedPayments.length}
          </span>{" "}
          payments
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-emerald-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
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
                    ? "bg-emerald-600 text-white"
                    : "border border-zinc-700 text-zinc-300 hover:border-emerald-500 hover:bg-zinc-800"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => page + 1)
            }
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-emerald-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentsTable;