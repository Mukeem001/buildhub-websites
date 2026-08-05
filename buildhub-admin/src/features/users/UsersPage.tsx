import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import UsersHeader from "./components/UsersHeader";
import UsersFilters from "./components/UsersFilters";
import UsersTable from "./components/UsersTable";
import BulkActions from "./components/BulkActions";
import UsersPagination from "./components/UsersPagination";
import CreateUserModal from "./components/CreateUserModal";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import UserDrawer from "./components/UserDrawer";
import { getUsers, deleteUser, bulkDeleteUsers, updateUserById } from "@/services/users";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  websites: number;
  status: string;
  joined: string;
  lastLogin: string;
}

const formatRole = (role?: string) => {
  const normalized = (role || "").toLowerCase();
  return normalized === "admin" ? "Admin" : "User";
};

const UsersPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUserDrawer, setOpenUserDrawer] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);
  const [editUserId, setEditUserId] = useState<string | number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | number | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(
          data.map((user) => ({
            id: user.id ?? user._id ?? "",
            name: user.fullName,
            email: user.email,
            role: formatRole(user.role),
            plan: user.role === "admin" ? "Business" : "Free",
            websites: user.websiteCount ?? 0,
            status: user.isActive === false ? "Suspended" : "Active",
            joined: user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-",
            lastLogin: "Just now",
          }))
        );
      } catch (error) {
        console.error(error);
        toast.error("Unable to load users.");
      } finally {
        setLoading(false);
      }
    };

    void loadUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, planFilter, statusFilter, rowsPerPage]);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch);

      const matchesRole =
        roleFilter === "All Roles" ||
        user.role.toLowerCase() === roleFilter.toLowerCase();

      const matchesPlan =
        planFilter === "All Plans" ||
        user.plan.toLowerCase() === planFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesPlan && matchesStatus;
    });
  }, [users, search, roleFilter, planFilter, statusFilter]);

  const totalRows = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    (async () => {
      try {
        await bulkDeleteUsers(selectedIds.map(String));
        setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));
        toast.success(`${selectedIds.length} user(s) deleted.`);
        setSelectedIds([]);
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || "Failed to delete users");
      }
    })();
  };

  const handleSuspendSelected = () => {
    if (selectedIds.length === 0) return;
    (async () => {
      try {
        await Promise.all(selectedIds.map((id) => updateUserById(String(id), { status: "Suspended" })));
        setUsers((prev) => prev.map((u) => (selectedIds.includes(u.id) ? { ...u, status: "Suspended" } : u)));
        toast.success(`${selectedIds.length} user(s) suspended.`);
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || "Failed to suspend users");
      }
    })();
  };

  const handleChangeRoleSelected = () => {
    if (selectedIds.length === 0) return;
    (async () => {
      try {
        const newRole = window.prompt("Enter new role for selected users (User, Editor, Admin, Super Admin):", "User");
        if (!newRole) return;
        await Promise.all(selectedIds.map((id) => updateUserById(String(id), { role: newRole })));
        setUsers((prev) => prev.map((u) => (selectedIds.includes(u.id) ? { ...u, role: newRole } : u)));
        toast.success(`${selectedIds.length} user(s) role updated to ${newRole}.`);
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || "Failed to change roles");
      }
    })();
  };

  const handleExportSelected = () => {
    if (selectedIds.length === 0) return;
    const rows = users.filter((u) => selectedIds.includes(u.id));
    const header = ["id", "name", "email", "role", "plan", "status", "joined"].join(",");
    const csv = [header]
      .concat(
        rows.map((r) => [r.id, r.name, r.email, r.role, r.plan, r.status, r.joined].map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${selectedIds.length} user(s) exported.`);
  };

  const handleEditUser = (id: string | number) => {
    setEditUserId(id);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (id: string | number) => {
    setDeleteUserId(id);
    setOpenDeleteDialog(true);
  };

  const handleViewUser = (id: string | number) => {
    setSelectedUserId(id);
    setOpenUserDrawer(true);
  };

  return (
    <div className="space-y-8">
      <UsersHeader onAddUser={() => setOpenCreateModal(true)} />

      <UsersFilters
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        planFilter={planFilter}
        onPlanFilterChange={setPlanFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        totalUsers={totalRows}
      />

      <BulkActions
        selectedCount={selectedIds.length}
        onDeleteSelected={handleDeleteSelected}
        onSuspendSelected={handleSuspendSelected}
        onChangeRoleSelected={handleChangeRoleSelected}
        onExportSelected={handleExportSelected}
      />

      <UsersTable
        users={paginatedUsers}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onViewUser={handleViewUser}
      />

      <UsersPagination
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      <CreateUserModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      <CreateUserModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setEditUserId(null);
        }}
        mode="edit"
        userId={editUserId ?? undefined}
      />

      <UserDrawer
        open={openUserDrawer}
        userId={selectedUserId ?? undefined}
        onClose={() => {
          setOpenUserDrawer(false);
          setSelectedUserId(null);
        }}
      />

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setDeleteUserId(null);
        }}
        onConfirm={async () => {
          try {
            if (deleteUserId) {
              await deleteUser(String(deleteUserId));
              setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
              setSelectedIds((prev) => prev.filter((id) => id !== deleteUserId));
              toast.success(`User deleted.`);
              setDeleteUserId(null);
            } else if (selectedIds.length > 0) {
              await bulkDeleteUsers(selectedIds.map(String));
              setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));
              toast.success(`${selectedIds.length} user(s) deleted.`);
              setSelectedIds([]);
            }
          } catch (err: any) {
            console.error(err);
            toast.error(err?.message || "Failed to delete user(s)");
          } finally {
            setOpenDeleteDialog(false);
          }
        }}
      />

      {loading && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-16 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Loading users...
          </h2>
        </div>
      )}
    </div>
  );
};

export default UsersPage;