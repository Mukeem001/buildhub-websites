import { Globe, Plus, Search } from "lucide-react";

interface WebsitesHeaderProps {
  onCreateWebsite: () => void;
  search: string;
  status: string;
  plan: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPlanChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const WebsitesHeader = ({
  onCreateWebsite,
  search,
  status,
  plan,
  sortBy,
  onSearchChange,
  onStatusChange,
  onPlanChange,
  onSortChange,
}: WebsitesHeaderProps) => {




    return (
        <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

            {/* Top */}

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                <div>
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-600/20 p-3">
                            <Globe className="h-6 w-6 text-blue-500" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Websites
                            </h1>

                            <p className="mt-1 text-zinc-400">
                                Manage all websites created on BuildHub.
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onCreateWebsite}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                    <Plus className="h-5 w-5" />
                    Create Website
                </button>

            </div>

            {/* Search */}

            <div className="space-y-4">

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search websites..."
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
                    />
                </div>

                {/* Filters */}
                <div className="grid gap-4 md:grid-cols-3">

                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                    >
                        <option value="">All Status</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>


                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="visitors">Sort by Visitors</option>
                        <option value="plan">Sort by Plan</option>
                        <option value="status">Sort by Status</option>
                    </select>

                    <select
                        value={plan}
                        onChange={(e) => onPlanChange(e.target.value)}
                        className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                    >
                        <option value="">All Plans</option>
                        <option value="Free">Free</option>
                        <option value="Pro">Pro</option>
                        <option value="Business">Business</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>

                </div>

            </div>

        </div>
    );
};

export default WebsitesHeader;