import { Download, Plus, Upload } from "lucide-react";

interface UsersHeaderProps {
    onAddUser: () => void;
}

const UsersHeader = ({ onAddUser }: UsersHeaderProps) => {
    return (
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Users
                </h1>

                <p className="mt-2 text-zinc-400">
                    Manage customers, subscriptions, permissions and account status.
                </p>
            </div>

            {/* Right */}
            <div className="flex flex-wrap gap-3">

                <button className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-blue-500 hover:text-white">
                    <Upload size={18} />
                    Import
                </button>

                <button className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-blue-500 hover:text-white">
                    <Download size={18} />
                    Export
                </button>

                <button
                    onClick={onAddUser}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                    <Plus size={18} />
                    Add User
                </button>

            </div>
        </div>
    );
};

export default UsersHeader;