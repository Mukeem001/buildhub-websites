import { useMemo, useState } from "react";

import RolesHeader from "./components/RolesHeader";
import RolesStats from "./components/RolesStats";
import RolesFilters from "./components/RolesFilters";
import RolesTable from "./components/RolesTable";
import BulkActionsBar from "./components/BulkActionsBar";

import CreateRoleModal from "./components/CreateRoleModal";
import EditRoleModal from "./components/EditRoleModal";
import DeleteRoleDialog from "./components/DeleteRoleDialog";
import AssignUsersDrawer from "./components/AssignUsersDrawer";

import { roles as initialRoles } from "./data/roles";
import { Role } from "./types/role";

const demoUsers = [
  {
    id: 1,
    name: "Ahmad Sheikh",
    email: "ahmad@buildhub.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "Online" as const,
  },
  {
    id: 2,
    name: "John Carter",
    email: "john@buildhub.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "Offline" as const,
  },
  {
    id: 3,
    name: "Emma Watson",
    email: "emma@buildhub.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "Online" as const,
  },
  {
    id: 4,
    name: "Sophia Lee",
    email: "sophia@buildhub.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    status: "Offline" as const,
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@buildhub.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "Online" as const,
  },
];

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  const [search, setSearch] = useState("");

  const [roleType, setRoleType] = useState("");

  const [usersFilter, setUsersFilter] = useState("");

  const [sortBy, setSortBy] = useState("latest");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [createOpen, setCreateOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [assignOpen, setAssignOpen] = useState(false);

  const [activeRole, setActiveRole] = useState<Role | null>(null);

  const filteredRoles = useMemo(() => {
    let data = [...roles];

    if (search) {
      data = data.filter(
        (role) =>
          role.name.toLowerCase().includes(search.toLowerCase()) ||
          role.description
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (roleType === "system") {
      data = data.filter((role) => role.isSystem);
    }

    if (roleType === "custom") {
      data = data.filter((role) => !role.isSystem);
    }

    if (usersFilter === "0-5") {
      data = data.filter((role) => role.users <= 5);
    }

    if (usersFilter === "6-10") {
      data = data.filter(
        (role) => role.users >= 6 && role.users <= 10
      );
    }

    if (usersFilter === "11-20") {
      data = data.filter(
        (role) => role.users >= 11 && role.users <= 20
      );
    }

    if (usersFilter === "20+") {
      data = data.filter((role) => role.users > 20);
    }

    return data;
  }, [roles, search, roleType, usersFilter]);

    // -----------------------------
  // Sorting
  // -----------------------------

  const sortedRoles = useMemo(() => {
    const data = [...filteredRoles];

    switch (sortBy) {
      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "users":
        data.sort((a, b) => b.users - a.users);
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
    }

    return data;
  }, [filteredRoles, sortBy]);

  // -----------------------------
  // Statistics
  // -----------------------------

  const totalUsers = roles.reduce(
    (sum, role) => sum + role.users,
    0
  );

  const totalPermissions = roles.reduce(
    (sum, role) => sum + role.permissions.length,
    0
  );

  const systemRoles = roles.filter(
    (role) => role.isSystem
  ).length;

  const customRoles = roles.filter(
    (role) => !role.isSystem
  ).length;

  // -----------------------------
  // Create Role
  // -----------------------------

  const handleCreateRole = (
    role: Omit<Role, "id" | "createdAt" | "updatedAt">
  ) => {
    const newRole: Role = {
      ...role,
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setRoles((prev) => [newRole, ...prev]);
  };

  // -----------------------------
  // Save Role
  // -----------------------------

  const handleSaveRole = (updatedRole: Role) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === updatedRole.id
          ? updatedRole
          : role
      )
    );
  };

  // -----------------------------
  // Delete Role
  // -----------------------------

  const handleDeleteRole = () => {
    if (!activeRole) return;

    setRoles((prev) =>
      prev.filter(
        (role) => role.id !== activeRole.id
      )
    );

    setDeleteOpen(false);

    setActiveRole(null);

    setSelectedIds([]);
  };

  // -----------------------------
  // Bulk Delete
  // -----------------------------

  const handleBulkDelete = () => {
    setRoles((prev) =>
      prev.filter(
        (role) => !selectedIds.includes(role.id)
      )
    );

    setSelectedIds([]);
  };

  // -----------------------------
  // Export
  // -----------------------------

  const exportJSON = () => {
    console.log("Export JSON", roles);
  };

  const exportCSV = () => {
    console.log("Export CSV", roles);
  };

  // -----------------------------
  // Refresh
  // -----------------------------

  const refreshData = () => {
    setRoles([...roles]);
  };

  // -----------------------------
  // Reset Filters
  // -----------------------------

  const resetFilters = () => {
    setSearch("");
    setRoleType("");
    setUsersFilter("");
    setSortBy("latest");
  };
    return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <RolesHeader
        search={search}
        onSearchChange={setSearch}
        onRefresh={refreshData}
        onExportCSV={exportCSV}
        onExportJSON={exportJSON}
        onCreateRole={() => setCreateOpen(true)}
      />

      {/* Stats */}

      <RolesStats
        totalRoles={roles.length}
        totalUsers={totalUsers}
        systemRoles={systemRoles}
        customRoles={customRoles}
        totalPermissions={totalPermissions}
        activeAssignments={totalUsers}
      />

      {/* Filters */}

      <RolesFilters
        roleType={roleType}
        users={usersFilter}
        sortBy={sortBy}
        onRoleTypeChange={setRoleType}
        onUsersChange={setUsersFilter}
        onSortChange={setSortBy}
        onReset={resetFilters}
      />

      {/* Bulk Actions */}

      <BulkActionsBar
        selectedCount={selectedIds.length}
        onDelete={handleBulkDelete}
        onExportCSV={exportCSV}
        onExportJSON={exportJSON}
        onClearSelection={() => setSelectedIds([])}
      />

      {/* Table */}

      <RolesTable
        roles={sortedRoles}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onView={(role) => {
          setActiveRole(role);
          setEditOpen(true);
        }}
        onEdit={(role) => {
          setActiveRole(role);
          setEditOpen(true);
        }}
        onDelete={(role) => {
          setActiveRole(role);
          setDeleteOpen(true);
        }}
        onAssignUsers={(role) => {
          setActiveRole(role);
          setAssignOpen(true);
        }}
      />

            {/* Create Role */}

      <CreateRoleModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateRole}
      />

      {/* Edit Role */}

      <EditRoleModal
        open={editOpen}
        role={activeRole}
        onClose={() => {
          setEditOpen(false);
          setActiveRole(null);
        }}
        onSave={handleSaveRole}
      />

      {/* Delete Dialog */}

      <DeleteRoleDialog
        open={deleteOpen}
        role={activeRole}
        onClose={() => {
          setDeleteOpen(false);
          setActiveRole(null);
        }}
        onConfirm={handleDeleteRole}
      />

      {/* Assign Users */}

      <AssignUsersDrawer
        open={assignOpen}
        role={activeRole}
        users={demoUsers}
        onClose={() => {
          setAssignOpen(false);
          setActiveRole(null);
        }}
        onAssign={(userId) => {
          console.log("Assign User:", userId);
        }}
        onRemove={(userId) => {
          console.log("Remove User:", userId);
        }}
      />
    </div>
  );
};

export default RolesPage;