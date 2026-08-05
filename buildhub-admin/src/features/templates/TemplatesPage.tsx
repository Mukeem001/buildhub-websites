import { useEffect, useState } from "react";
import { toast } from "sonner";

import TemplatesHeader from "./components/TemplatesHeader";
import TemplatesStats from "./components/TemplatesStats";
import TemplatesTable from "./components/TemplatesTable";
import CreateTemplateModal from "./components/CreateTemplateModal";
import TemplateDrawer from "./components/TemplateDrawer";
import DeleteTemplateDialog from "./components/DeleteTemplateDialog";
import BulkActionsBar from "./components/BulkActionsBar";

import {
  createTemplate,
  deleteTemplate,
  getTemplates,
  updateTemplate,
} from "@/services/templates";
import { Template } from "./types/template";

const TemplatesPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);
  const [templateList, setTemplateList] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const mapTemplateToUi = (template: any, index: number): Template => ({
    id: template.id || template._id,
    name: template.name,
    description: template.description || "",
    category: template.category || "General",
    author: template.author || "BuildHub",
    price: Number(template.price) || 0,
    downloads: Number(template.downloads) || 0,
    status: template.isActive ? "Published" : "Draft",
    image:
      template.thumbnail ||
      `https://picsum.photos/400/300?random=${index + 1}`,
    slug: template.slug,
    rating: Number(template.rating) || 4.8,
    premium: Boolean(template.premium),
    previewUrl: template.previewUrl || "",
    featured: Boolean(template.isActive),
    createdAt: template.createdAt
      ? new Date(template.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-",
    updatedAt: template.updatedAt
      ? new Date(template.updatedAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-",
  });

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const templates = await getTemplates();
      setTemplateList(templates.map(mapTemplateToUi));
    } catch (error) {
      console.error(error);
      toast.error("Unable to load templates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTemplates();
  }, []);

  const handleOpenCreateModal = () => {
    setSelectedTemplate(null);
    setOpenCreateModal(true);
  };

  const handleOpenEditModal = (template: Template) => {
    setSelectedTemplate(template);
    setOpenCreateModal(true);
  };

  const handleOpenDrawer = (template: Template) => {
    setSelectedTemplate(template);
    setOpenDrawer(true);
  };

  const handleOpenDeleteDialog = (template: Template) => {
    setSelectedTemplate(template);
    setOpenDeleteDialog(true);
  };

  const handleCreateOrUpdate = async (payload: any) => {
    try {
      if (selectedTemplate) {
        await updateTemplate(selectedTemplate.id.toString(), payload);
        toast.success("Template updated successfully.");
      } else {
        await createTemplate(payload);
        toast.success("Template created successfully.");
      }

      setOpenCreateModal(false);
      setSelectedTemplate(null);
      await loadTemplates();
    } catch (error) {
      console.error(error);
      toast.error("Unable to save template.");
    }
  };

  const handleDelete = async () => {
    if (!selectedTemplate) return;

    try {
      await deleteTemplate(selectedTemplate.id.toString());
      toast.success("Template deleted successfully.");
      setOpenDeleteDialog(false);
      setSelectedTemplate(null);
      setSelectedIds((prev) => prev.filter((id) => id !== selectedTemplate.id));
      await loadTemplates();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete template.");
    }
  };

  const handleBulkPublish = async () => {
    if (selectedIds.length === 0) return;

    try {
      await Promise.all(
        selectedIds.map((id) => updateTemplate(String(id), { isActive: true }))
      );
      toast.success("Selected templates published.");
      setSelectedIds([]);
      await loadTemplates();
    } catch (error) {
      console.error(error);
      toast.error("Unable to publish selected templates.");
    }
  };

  return (
    <>
      <div className="space-y-8">
        <TemplatesHeader
          onCreateTemplate={handleOpenCreateModal}
          search={search}
          status={status}
          category={category}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onCategoryChange={setCategory}
          onSortChange={setSortBy}
        />

        <TemplatesStats />

        <BulkActionsBar
          selectedCount={selectedIds.length}
          onDelete={() => {
            if (selectedIds.length > 0) {
              setSelectedTemplate(null);
              setOpenDeleteDialog(true);
            }
          }}
          onExport={() => toast.success("Export is ready to be implemented.")}
          onPublish={handleBulkPublish}
          onClear={() => setSelectedIds([])}
        />

        <TemplatesTable
          templates={templateList}
          search={search}
          status={status}
          category={category}
          sortBy={sortBy}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onViewTemplate={handleOpenDrawer}
          onEditTemplate={handleOpenEditModal}
          onDeleteTemplate={handleOpenDeleteDialog}
        />
      </div>

      <CreateTemplateModal
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
          setSelectedTemplate(null);
        }}
        mode={selectedTemplate ? "edit" : "create"}
        template={selectedTemplate}
        onSubmit={handleCreateOrUpdate}
      />

      <TemplateDrawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setSelectedTemplate(null);
        }}
        template={selectedTemplate}
      />

      <DeleteTemplateDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setSelectedTemplate(null);
        }}
        onConfirm={handleDelete}
        templateName={selectedTemplate?.name}
      />
    </>
  );
};

export default TemplatesPage;