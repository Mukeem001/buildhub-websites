import { useState } from "react";

import OrdersHeader from "./components/OrdersHeader";
import OrdersStats from "./components/OrdersStats";
import OrdersTable from "./components/OrdersTable";
import CreateOrderModal from "./components/CreateOrderModal";
import OrderDrawer from "./components/OrderDrawer";
import DeleteOrderDialog from "./components/DeleteOrderDialog";
import BulkActionsBar from "./components/BulkActionsBar";

import { orders } from "./data/orders";

import {
  exportWebsitesCSV,
  exportOrdersCSV,
} from "@/utils/export";


import {
  deleteSelectedOrders,
  completeSelectedOrders,
} from "@/utils/orderActions";



import { toast } from "sonner";

const OrdersPage = () => {
  // Modal States
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Local Data
  const [orderList, setOrderList] = useState<any[]>(orders);

  // Delete Selected
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one order.");
      return;
    }

    const updated = deleteSelectedOrders(
      selectedIds,
      orderList
    );

    setOrderList(updated);

    toast.success(
      `${selectedIds.length} order(s) deleted successfully`
    );

    setSelectedIds([]);
  };

  // Complete Selected
  const handleCompleteSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one order.");
      return;
    }

    const updated = completeSelectedOrders(
      selectedIds,
      orderList
    );

    setOrderList(updated);

    toast.success(
      `${selectedIds.length} order(s) completed successfully`
    );

    setSelectedIds([]);
  };

  // Export Selected
  const handleExportSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one order.");
      return;
    }

    const selectedOrders = orderList.filter((order) =>
      selectedIds.includes(order.id)
    );

    exportOrdersCSV(selectedOrders);

    toast.success(
      `${selectedOrders.length} order(s) exported successfully`
    );
  };

  return (
    <>
      <div className="space-y-8">

        <OrdersHeader
          onCreateOrder={() =>
            setOpenCreateModal(true)
          }
          search={search}
          status={status}
          payment={payment}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onPaymentChange={setPayment}
          onSortChange={setSortBy}
        />

        <OrdersStats />

        <BulkActionsBar
          selectedCount={selectedIds.length}
          onDelete={handleDeleteSelected}
          onExport={handleExportSelected}
          onComplete={handleCompleteSelected}
          onClear={() => setSelectedIds([])}
        />

        <OrdersTable
          orders={orderList}
          search={search}
          status={status}
          payment={payment}
          sortBy={sortBy}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onViewOrder={() => setOpenDrawer(true)}
          onEditOrder={() => setOpenCreateModal(true)}
          onDeleteOrder={() =>
            setOpenDeleteDialog(true)
          }
        />

      </div>

      <CreateOrderModal
        open={openCreateModal}
        onClose={() =>
          setOpenCreateModal(false)
        }
        mode="create"
      />

      <OrderDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />

      <DeleteOrderDialog
        open={openDeleteDialog}
        onClose={() =>
          setOpenDeleteDialog(false)
        }
        onConfirm={() => {
          toast.success("Order deleted");
          setOpenDeleteDialog(false);
        }}
      />
    </>
  );
};

export default OrdersPage;