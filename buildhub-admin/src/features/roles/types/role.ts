export type PermissionAction =
  | "view"
  | "create"
  | "update"
  | "delete"
  | "manage";

export interface Permission {
  module: string;
  actions: PermissionAction[];
}

export interface Role {
  id: number;
  name: string;
  description: string;

  color: string;

  users: number;

  isSystem: boolean;

  createdAt: string;

  updatedAt: string;

  permissions: Permission[];
}