import { LayoutTemplate, Plus, Search } from "lucide-react";

interface TemplatesHeaderProps {
  onCreateTemplate: () => void;

  search: string;
  status: string;
  category: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const TemplatesHeader = ({
  onCreateTemplate,
  search,
  status,
  category,
  sortBy,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onSortChange,
}: TemplatesHeaderProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-violet-600/20 p-3">
            <LayoutTemplate className="h-6 w-6 text-violet-500" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Templates
            </h1>

            <p className="mt-1 text-zinc-400">
              Manage premium website templates.
            </p>
          </div>

        </div>

        <button
          onClick={onCreateTemplate}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
        >
          <Plus className="h-5 w-5" />
          Create Template
        </button>

      </div>

      {/* Search */}

      <div className="space-y-4">

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-violet-500"
          />

        </div>

        {/* Filters */}

        <div className="grid gap-4 md:grid-cols-3">

          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          >
            <option value="">All Categories</option>
            <option value="Business">Business</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Agency">Agency</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Fitness">Fitness</option>
            <option value="Photography">Photography</option>
          </select>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          >
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          >
            <option value="name">Sort by Name</option>
            <option value="downloads">Sort by Downloads</option>
            <option value="price">Sort by Price</option>
            <option value="status">Sort by Status</option>
          </select>

        </div>

      </div>

    </div>
  );
};

export default TemplatesHeader;