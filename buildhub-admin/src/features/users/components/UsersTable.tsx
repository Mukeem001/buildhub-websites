import {
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import { useState } from "react";
import UserDrawer from "./UserDrawer";

interface UserTableItem {
    id: string | number;
    name: string;
    email: string;
    role: string;
    plan?: string;
    websites?: number;
    status?: string;
    joined?: string;
    lastLogin?: string;
}

interface UsersTableProps {
    users: UserTableItem[];
    selectedIds: Array<string | number>;
    setSelectedIds: React.Dispatch<React.SetStateAction<Array<string | number>>>;
    onEditUser: (id: string | number) => void;
    onDeleteUser: (id: string | number) => void;
    onViewUser: (id: string | number) => void;
}

const badgeColor = (status?: string) => {
    switch (status) {
        case "Active":
            return "bg-emerald-500/10 text-emerald-400";

        case "Pending":
            return "bg-yellow-500/10 text-yellow-400";

        case "Suspended":
            return "bg-red-500/10 text-red-400";

        default:
            return "bg-red-500/10 text-red-400";
    }
};

const formatRole = (role: string) => {
    return role?.toLowerCase() === "admin" ? "Admin" : "User";
};

const UsersTable = ({
    users,
    selectedIds,
    setSelectedIds,
    onEditUser,
    onDeleteUser,
    onViewUser,
}: UsersTableProps) => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const allSelected = users.length > 0 && users.every((user) => selectedIds.includes(user.id));

    const handleToggleAll = () => {
        if (allSelected) {
            setSelectedIds((prev) => prev.filter((id) => !users.some((user) => user.id === id)));
            return;
        }

        setSelectedIds((prev) => {
            const pageIds = users.map((user) => user.id);
            return Array.from(new Set([...prev, ...pageIds]));
        });
    };

    const handleToggleRow = (id: string | number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-zinc-950">

                        <tr className="text-left text-sm text-zinc-400">

                            <th className="p-5">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={handleToggleAll}
                                />
                            </th>

                            <th className="p-5">User</th>

                            <th className="p-5">Role</th>

                            <th className="p-5">Plan</th>

                            <th className="p-5">Websites</th>

                            <th className="p-5">Status</th>

                            <th className="p-5">Joined</th>

                            <th className="p-5">Last Login</th>

                            <th className="p-5">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-t border-zinc-800 transition hover:bg-zinc-950"
                            >
                                <td className="p-5">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(user.id)}
                                        onChange={() => handleToggleRow(user.id)}
                                    />
                                </td>

                                <td className="p-5">
                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                            {user.name.charAt(0)}
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-white">
                                                {user.name}
                                            </h3>

                                            <p className="text-sm text-zinc-500">
                                                {user.email}
                                            </p>
                                        </div>

                                    </div>
                                </td>

                                <td className="p-5 text-zinc-300">
                                    {formatRole(user.role)}
                                </td>

                                <td className="p-5">
                                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                        {user.plan}
                                    </span>
                                </td>

                                <td className="p-5 text-white">
                                    {user.websites}
                                </td>

                                <td className="p-5">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm ${badgeColor(
                                            user.status
                                        )}`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                <td className="p-5 text-zinc-400">
                                    {user.joined}
                                </td>

                                <td className="p-5 text-zinc-400">
                                    {user.lastLogin}
                                </td>

                                <td className="p-5">
                                    <div className="flex items-center gap-2">

                                        <button
                                            onClick={() => onViewUser(user.id)}
                                            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => onEditUser(user.id)}
                                            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDeleteUser(user.id)}
                                            className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                        <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
                                            <MoreHorizontal size={16} />
                                        </button>

                                    </div>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <UserDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

        </div>
    );
};

export default UsersTable;