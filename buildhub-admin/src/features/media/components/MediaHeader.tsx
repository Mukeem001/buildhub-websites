import {
  Image,
  Plus,
  Search,
} from "lucide-react";

interface MediaHeaderProps {
  onUploadMedia: () => void;

  search: string;
  folder: string;
  type: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onFolderChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const MediaHeader = ({
  onUploadMedia,

  search,
  folder,
  type,
  sortBy,

  onSearchChange,
  onFolderChange,
  onTypeChange,
  onSortChange,
}: MediaHeaderProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

      {/* Top */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-violet-500/10 p-3">
            <Image className="h-7 w-7 text-violet-400" />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">
              Media Library
            </h1>

            <p className="mt-1 text-zinc-400">
              Upload and manage all images, videos and documents.
            </p>

          </div>

        </div>

        <button
          onClick={onUploadMedia}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
        >
          <Plus className="h-5 w-5" />

          Upload Media
        </button>

      </div>

      {/* Search */}

      <div className="space-y-4">

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-violet-500"
          />

        </div>

        {/* Filters */}

        <div className="grid gap-4 md:grid-cols-3">

          {/* Folder */}

          <select
            value={folder}
            onChange={(e) =>
              onFolderChange(e.target.value)
            }
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          >
            <option value="">
              All Folders
            </option>

            <option value="Homepage">
              Homepage
            </option>

            <option value="Marketing">
              Marketing
            </option>

            <option value="Products">
              Products
            </option>

            <option value="Branding">
              Branding
            </option>

            <option value="Legal">
              Legal
            </option>

            <option value="Invoices">
              Invoices
            </option>

          </select>

          {/* Type */}

          <select
            value={type}
            onChange={(e) =>
              onTypeChange(e.target.value)
            }
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          >
            <option value="">
              All Types
            </option>

            <option value="Image">
              Images
            </option>

            <option value="Video">
              Videos
            </option>

            <option value="Document">
              Documents
            </option>

          </select>

          {/* Sort */}

          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          >
            <option value="name">
              Sort by Name
            </option>

            <option value="date">
              Sort by Upload Date
            </option>

            <option value="size">
              Sort by File Size
            </option>

            <option value="type">
              Sort by Type
            </option>

          </select>

        </div>

      </div>

    </div>
  );
};

export default MediaHeader;