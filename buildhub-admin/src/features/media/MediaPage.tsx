import { useState } from "react";

import MediaHeader from "./components/MediaHeader";
import MediaStats from "./components/MediaStats";
import MediaTable from "./components/MediaTable";
import BulkActionsBar from "./components/BulkActionsBar";
import UploadMediaModal from "./components/UploadMediaModal";
import MediaDrawer from "./components/MediaDrawer";
import DeleteMediaDialog from "./components/DeleteMediaDialog";

import { media } from "./data/media";

const MediaPage = () => {
  // Modal States

  const [openUploadModal, setOpenUploadModal] =
    useState(false);

  const [openDrawer, setOpenDrawer] =
    useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] =
    useState(false);

  // Filters

  const [search, setSearch] = useState("");

  const [folder, setFolder] = useState("");

  const [type, setType] = useState("");

  const [sortBy, setSortBy] =
    useState("name");

  // Bulk Selection

  const [selectedIds, setSelectedIds] =
    useState<number[]>([]);

  // Local Data

  const [mediaList] = useState(media);

  return (
    <>
      <div className="space-y-8">

        <MediaHeader
          onUploadMedia={() =>
            setOpenUploadModal(true)
          }
          search={search}
          folder={folder}
          type={type}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onFolderChange={setFolder}
          onTypeChange={setType}
          onSortChange={setSortBy}
        />

        <MediaStats />

        <BulkActionsBar
          selectedCount={selectedIds.length}
          onMove={() => {}}
          onExport={() => {}}
          onDelete={() => {}}
          onClear={() =>
            setSelectedIds([])
          }
        />

        <MediaTable
          media={mediaList}
          search={search}
          folder={folder}
          type={type}
          sortBy={sortBy}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onViewMedia={() =>
            setOpenDrawer(true)
          }
          onEditMedia={() =>
            setOpenUploadModal(true)
          }
          onDeleteMedia={() =>
            setOpenDeleteDialog(true)
          }
        />

      </div>

      <UploadMediaModal
        open={openUploadModal}
        onClose={() =>
          setOpenUploadModal(false)
        }
      />

      <MediaDrawer
        open={openDrawer}
        onClose={() =>
          setOpenDrawer(false)
        }
      />

      <DeleteMediaDialog
        open={openDeleteDialog}
        onClose={() =>
          setOpenDeleteDialog(false)
        }
        onConfirm={() => {
          setOpenDeleteDialog(false);
        }}
      />
    </>
  );
};

export default MediaPage;