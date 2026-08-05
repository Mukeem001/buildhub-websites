import { useEffect, useState } from "react";
import { toast } from "sonner";

import WebsitesHeader from "./components/WebsitesHeader";
import WebsitesStats from "./components/WebsitesStats";
import WebsitesTable from "./components/WebsitesTable";
import CreateWebsiteModal, {
  type WebsiteFormValues,
} from "./components/CreateWebsiteModal";
import WebsiteDrawer from "./components/WebsiteDrawer";
import DeleteWebsiteDialog from "./components/DeleteWebsiteDialog";
import BulkActionsBar from "./components/BulkActionsBar";

import {
  deleteSelectedWebsites,
  publishSelectedWebsites,
  type Website,
} from "@/utils/websiteActions";
import { exportWebsitesCSV } from "@/utils/export";
import { deleteWebsite, updateWebsite } from "@/services/website";
import { getAllWebsites } from "@/services/superAdmin";

const WebsitesPage = () => {
  // =========================
  // Modal States
  // =========================

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null);

  // =========================
  // Filters
  // =========================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // =========================
  // Selection
  // =========================

  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);

  // =========================
  // Website List
  // =========================

  const [websiteList, setWebsiteList] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      setLoading(true);
      try {
        const websites = await getAllWebsites();
        setWebsiteList(
          websites.map((website) => {
            // Build a friendly owner string showing username and email when available
            let ownerString = "Unknown";

            if (typeof website.owner === "string") {
              ownerString = website.owner;
            } else if (website.owner && (website.owner as any).fullName) {
              const ownerObj = website.owner as any;
              const username = ownerObj.fullName || "Unknown";
              const email = ownerObj.email;

              ownerString = email ? `${username} — ${email}` : `${username}`;
            } else if (website.userId && (website.userId as any).fullName) {
              const userObj = website.userId as any;
              const username = userObj.fullName || "Unknown";
              const email = userObj.email;

              ownerString = email ? `${username} — ${email}` : `${username}`;
            }

            return {
              id: website._id,
              name: website.name,
              domain:
                website.domain || website.customDomain || website.subdomain || "-",
              owner: ownerString,
              template: website.templateSlug || "Unknown",
              status:
                website.status === "published"
                  ? "Published"
                  : website.status === "draft"
                  ? "Draft"
                  : "Maintenance",
              plan:
                website.isPublished
                  ? "Pro"
                  : website.status === "draft"
                  ? "Free"
                  : "Business",
              visitors: website.visitors ?? 0,
              storage: website.storage || "0 GB",
              createdAt: website.createdAt
                ? new Date(website.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-",
            };
          })
        );
      } catch (error) {
        console.error(error);
        toast.error("Unable to load websites.");
      } finally {
        setLoading(false);
      }
    };

    void fetchWebsites();
  }, []);

  const handleCreateWebsite = (data: WebsiteFormValues) => {
    const nextWebsite: Website = {
      id: Date.now(),
      name: data.name,
      domain: data.domain,
      owner: data.owner,
      template: data.template,
      status: data.status,
      plan: data.plan,
      visitors: Number(data.visitors) || 0,
      storage: data.storage || "0 GB",
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setWebsiteList((prev) => [nextWebsite, ...prev]);
    setOpenCreateModal(false);
    toast.success(`Website "${data.name}" created successfully`);
  };

  // =========================
  // Bulk Delete
  // =========================

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one website.");
      return;
    }

    void (async () => {
      try {
        // Call delete endpoint for each selected website
        await Promise.all(
          selectedIds.map((id) => deleteWebsite(id.toString()))
        );

        setWebsiteList((prev) =>
          prev.filter((website) => !selectedIds.includes(website.id))
        );

        setSelectedWebsite((current) =>
          current && selectedIds.includes(current.id) ? null : current
        );

        setSelectedIds([]);

        toast.success(`${selectedIds.length} website(s) deleted successfully`);
      } catch (error) {
        console.error(error);
        toast.error("Unable to delete selected websites. Please try again.");
      }
    })();
  };

  const handleViewWebsite = (website: Website) => {
    setSelectedWebsite(website);
    setOpenDrawer(true);
  };

  const handleEditWebsite = (website: Website) => {
    setSelectedWebsite(website);
    setIsEditMode(true);
    setOpenCreateModal(true);
  };

  const handlePrepareDeleteWebsite = (website: Website) => {
    setWebsiteToDelete(website);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDeleteWebsite = async () => {
    if (!websiteToDelete) return;

    try {
      await deleteWebsite(websiteToDelete.id.toString());

      setWebsiteList((prev) =>
        prev.filter((site) => site.id !== websiteToDelete.id)
      );

      setSelectedIds((prev) =>
        prev.filter((id) => id !== websiteToDelete.id)
      );

      if (selectedWebsite?.id === websiteToDelete.id) {
        setSelectedWebsite(null);
        setOpenDrawer(false);
      }

      toast.success(
        `Website "${websiteToDelete.name}" deleted successfully`
      );
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete website. Please try again.");
      return;
    } finally {
      setWebsiteToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  // =========================
  // Bulk Publish
  // =========================

  const handlePublishSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one website.");
      return;
    }

    void (async () => {
      try {
        // Update each selected website to published on the backend
        await Promise.all(
          selectedIds.map((id) =>
            updateWebsite(id.toString(), { status: "published" })
          )
        );

        setWebsiteList((prev) =>
          prev.map((site) =>
            selectedIds.includes(site.id)
              ? { ...site, status: "Published" }
              : site
          )
        );

        setSelectedIds([]);

        toast.success(`${selectedIds.length} website(s) published successfully`);
      } catch (error) {
        console.error(error);
        toast.error("Unable to publish selected websites. Please try again.");
      }
    })();
  };

  const handleUpdateWebsite = async (
    id: string | number,
    data: WebsiteFormValues
  ) => {
    try {
      const updatedWebsite = await updateWebsite(
        id.toString(),
        {
          name: data.name,
          status: data.status === "Published" ? "published" : data.status === "Draft" ? "draft" : "archived",
        }
      );

      setWebsiteList((prev) =>
        prev.map((website) =>
          website.id === id
            ? {
                ...website,
                name: updatedWebsite.name || website.name,
                status:
                  updatedWebsite.status === "published"
                    ? "Published"
                    : updatedWebsite.status === "draft"
                    ? "Draft"
                    : "Maintenance",
              }
            : website
        )
      );

      setSelectedWebsite((current) =>
        current?.id === id
          ? {
              ...current,
              name: data.name,
              status: data.status,
            }
          : current
      );

      setOpenCreateModal(false);
      setIsEditMode(false);
      toast.success("Website updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update website. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 p-16 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Loading websites...
        </h2>
      </div>
    );
  }

  // =========================
  // Export CSV
  // =========================

  const handleExportSelected = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one website.");
      return;
    }

    const selectedWebsites = websiteList.filter((site) =>
      selectedIds.includes(site.id)
    );

    exportWebsitesCSV(selectedWebsites);

    toast.success(
      `${selectedWebsites.length} website(s) exported successfully`
    );
  };

  return (
    <>
      <div className="space-y-8">

        <WebsitesHeader
          onCreateWebsite={() => setOpenCreateModal(true)}
          search={search}
          status={status}
          plan={plan}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onPlanChange={setPlan}
          onSortChange={setSortBy}
        />

        <WebsitesStats websites={websiteList} />

        <BulkActionsBar
          selectedCount={selectedIds.length}
          onDelete={handleDeleteSelected}
          onPublish={handlePublishSelected}
          onExport={handleExportSelected}
          onClear={() => setSelectedIds([])}
        />

        <WebsitesTable
          websites={websiteList}
          search={search}
          status={status}
          plan={plan}
          sortBy={sortBy}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onViewWebsite={handleViewWebsite}
          onEditWebsite={handleEditWebsite}
          onDeleteWebsite={handlePrepareDeleteWebsite}
        />
      </div>

      {/* ========================= */}
      {/* Create Website Modal */}
      {/* ========================= */}

      <CreateWebsiteModal
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
          setIsEditMode(false);
          setSelectedWebsite(null);
        }}
        mode={isEditMode ? "edit" : "create"}
        website={selectedWebsite}
        onCreateWebsite={handleCreateWebsite}
        onUpdateWebsite={handleUpdateWebsite}
      />

      {/* ========================= */}
      {/* Website Drawer */}
      {/* ========================= */}

      <WebsiteDrawer
        open={openDrawer}
        website={selectedWebsite}
        onClose={() => setOpenDrawer(false)}
      />

      {/* ========================= */}
      {/* Delete Dialog */}
      {/* ========================= */}

      <DeleteWebsiteDialog
        open={openDeleteDialog}
        websiteName={websiteToDelete?.name}
        onClose={() => {
          setOpenDeleteDialog(false);
          setWebsiteToDelete(null);
        }}
        onConfirm={handleConfirmDeleteWebsite}
      />
    </>
  );
};

export default WebsitesPage;