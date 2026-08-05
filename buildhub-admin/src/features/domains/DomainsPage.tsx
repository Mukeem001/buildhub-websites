import { useEffect, useState } from "react";
import { toast } from "sonner";

import DomainsHeader from "./components/DomainsHeader";
import DomainsStats from "./components/DomainsStats";
import DomainsTable from "./components/DomainsTable";
import BulkActionsBar from "./components/BulkActionsBar";
import CreateDomainModal from "./components/CreateDomainModal";
import DomainDrawer from "./components/DomainDrawer";
import DeleteDomainDialog from "./components/DeleteDomainDialog";

import { getDomains, type DomainPayload } from "@/services/domain";

const DomainsPage = () => {
  // Modal States
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [registrar, setRegistrar] = useState("");
  const [sortBy, setSortBy] = useState("domain");

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);

  // Data
  const [domainList, setDomainList] = useState<DomainPayload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      setLoading(true);
      try {
        const domains = await getDomains();
        setDomainList(domains);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load domains.");
      } finally {
        setLoading(false);
      }
    };

    void fetchDomains();
  }, []);

  return (
    <>
      <div className="space-y-8">

        <DomainsHeader
          onCreateDomain={() => setOpenCreateModal(true)}
          search={search}
          status={status}
          registrar={registrar}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onRegistrarChange={setRegistrar}
          onSortChange={setSortBy}
        />

        <DomainsStats />

        <BulkActionsBar
          selectedCount={selectedIds.length}
          onConnect={() => {}}
          onExport={() => {}}
          onDelete={() => {}}
          onClear={() => setSelectedIds([])}
        />

        <DomainsTable
          domains={domainList.map((domain) => ({
            id: domain._id,
            domain: domain.domain,
            website:
              typeof domain.websiteId === "string"
                ? domain.websiteId
                : domain.websiteId?.name || "Unknown",
            owner: "Unknown",
            registrar: domain.cnameTarget || "Unknown",
            expiryDate: domain.createdAt
              ? new Date(domain.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-",
            ssl:
              domain.sslStatus === "active"
                ? "Active"
                : "Expired",
            status:
              domain.verificationStatus === "verified"
                ? "Connected"
                : domain.verificationStatus === "pending"
                ? "Pending"
                : "Expired",
            createdAt: domain.createdAt
              ? new Date(domain.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-",
          }))}
          search={search}
          status={status}
          registrar={registrar}
          sortBy={sortBy}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onViewDomain={() => setOpenDrawer(true)}
          onEditDomain={() => setOpenCreateModal(true)}
          onDeleteDomain={() => setOpenDeleteDialog(true)}
        />

      </div>

      <CreateDomainModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        mode="create"
      />

      <DomainDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />

      {loading && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-16 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Loading domains...
          </h2>
        </div>
      )}

      <DeleteDomainDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          setOpenDeleteDialog(false);
        }}
      />
    </>
  );
};

export default DomainsPage;