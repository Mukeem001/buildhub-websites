import { useState } from "react";
import { toast } from "sonner";

import PaymentsHeader from "./components/PaymentsHeader";
import PaymentsStats from "./components/PaymentsStats";
import PaymentsTable from "./components/PaymentsTable";
import CreatePaymentModal from "./components/CreatePaymentModal";
import PaymentDrawer from "./components/PaymentDrawer";
import DeletePaymentDialog from "./components/DeletePaymentDialog";
import BulkActionsBar from "./components/BulkActionsBar";

import { payments } from "./data/payments";

import { exportPaymentsCSV } from "@/utils/export";

import {
  deleteSelectedPayments,
  refundSelectedPayments,
} from "@/utils/paymentActions";

const PaymentsPage = () => {
  // Modal States
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Selection
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Data
  const [paymentList, setPaymentList] = useState(payments);

  // Delete
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one payment.");
      return;
    }

    const updated = deleteSelectedPayments(
      selectedIds,
      paymentList
    );

    setPaymentList(updated);

    toast.success(
      `${selectedIds.length} payment(s) deleted successfully`
    );

    setSelectedIds([]);
  };

  // Refund
  const handleRefundSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one payment.");
      return;
    }

    const updated = refundSelectedPayments(
      selectedIds,
      paymentList
    );

    setPaymentList(updated);

    toast.success(
      `${selectedIds.length} payment(s) refunded successfully`
    );

    setSelectedIds([]);
  };

  // Export
  const handleExportSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one payment.");
      return;
    }

    const selectedPayments = paymentList.filter((payment) =>
      selectedIds.includes(payment.id)
    );

    exportPaymentsCSV(selectedPayments);

    toast.success(
      `${selectedPayments.length} payment(s) exported successfully`
    );
  };

  return (
    <>
      <div className="space-y-8">

        <PaymentsHeader
          onCreatePayment={() => setOpenCreateModal(true)}
          search={search}
          status={status}
          method={method}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onMethodChange={setMethod}
          onSortChange={setSortBy}
        />

        <PaymentsStats />

        <BulkActionsBar
          selectedCount={selectedIds.length}
          onDelete={handleDeleteSelected}
          onRefund={handleRefundSelected}
          onExport={handleExportSelected}
          onClear={() => setSelectedIds([])}
        />

        <PaymentsTable
          payments={paymentList}
          search={search}
          status={status}
          method={method}
          sortBy={sortBy}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onViewPayment={() => setOpenDrawer(true)}
          onEditPayment={() => setOpenCreateModal(true)}
          onDeletePayment={() => setOpenDeleteDialog(true)}
        />

      </div>

      <CreatePaymentModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        mode="create"
      />

      <PaymentDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />

      <DeletePaymentDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          toast.success("Payment deleted successfully");
          setOpenDeleteDialog(false);
        }}
      />
    </>
  );
};

export default PaymentsPage;